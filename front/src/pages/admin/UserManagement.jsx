import { useState, useEffect, useCallback } from "react";
import SearchBar from "../../components/common/SearchBar";
import AppButton from "../../components/common/AppButton";
import axiosInstance from "../../api/axiosInstance";
import {
  Container,
  Header,
  Title,
  SearchWrapper,
  SearchInput,
  StatusSelect,
  Table,
  TableHeader,
  TableRow,
  UserInfo,
  Avatar,
  StatusBadge,
  ButtonWrapper,
  PaginationWrapper,
  PaginationButton,
  PageInfo,
  LoadingMessage,
} from "./UserManagement.styles";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 검색 및 필터 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL, ACTIVE, BANNED

  // 유저 목록 불러오기 (상태별 필터링 백엔드에서 처리)
  const fetchUsers = useCallback(
    async (page = 0, status = statusFilter) => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/admin/users/filter/${status}/${page}`);

        setUsers(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
        setCurrentPage(page);
      } catch (error) {
        console.error("유저 목록 조회 실패:", error);
        alert(`유저 목록을 불러오는데 실패했습니다.`);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    },
    [statusFilter]
  );

  useEffect(() => {
    fetchUsers(0);
  }, [fetchUsers]);

  // 상태 필터 변경 시 첫 페이지부터 다시 조회
  useEffect(() => {
    fetchUsers(0, statusFilter);
  }, [statusFilter, fetchUsers]);

  // 검색 필터링 (클라이언트 사이드)
  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return user.email?.toLowerCase().includes(term) || user.username?.toLowerCase().includes(term);
  });

  const handleBlock = async (userId) => {
    const days = prompt("정지 기간을 입력하세요 (7일, 30일, 365일, -1=영구):", "7");
    if (!days) return;

    const category = prompt("정지 사유 카테고리:", "규정 위반");
    const detail = prompt("상세 사유:", "");

    try {
      await axiosInstance.post(`/api/admin/users/${userId}/suspend`, {
        days: parseInt(days),
        category,
        detail,
      });
      alert("유저가 정지되었습니다.");
      fetchUsers(currentPage);
    } catch (error) {
      console.error("정지 실패:", error);
      alert("정지 처리에 실패했습니다.");
    }
  };

  const handleUnblock = async (userId) => {
    if (!confirm("정지를 해제하시겠습니까?")) return;

    try {
      const response = await axiosInstance.put(`/api/admin/users/${userId}/activate`);
      alert("정지가 해제되었습니다.");
      // 목록 새로고침
      await fetchUsers(currentPage);
    } catch (error) {
      console.error("해제 실패:", error);
      console.error("에러 상세:", error.response?.data);
      alert("정지 해제에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>사용자 관리</Title>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="이메일, 닉네임, 아이디로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <StatusSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">전체</option>
            <option value="BANNED">정지</option>
            <option value="ACTIVE">활성</option>
          </StatusSelect>
        </SearchWrapper>
      </Header>

      {loading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : (
        <>
          <Table>
            <TableHeader>
              <div>사용자</div>
              <div>이메일</div>
              <div>상태</div>
              <div>관리</div>
            </TableHeader>
            {filteredUsers.map((user) => (
              <TableRow key={user.userId}>
                <UserInfo>
                  <Avatar>{(user.nickname || user.username || "U")[0].toUpperCase()}</Avatar>
                  <span>{user.nickname || user.username}</span>
                </UserInfo>
                <div>{user.email}</div>
                <div>
                  <StatusBadge $active={user.status === "ACTIVE"}>
                    {user.status === "ACTIVE" ? "활성" : "정지"}
                  </StatusBadge>
                </div>
                <ButtonWrapper>
                  {user.status === "ACTIVE" ? (
                    <AppButton onClick={() => handleBlock(user.userId)}>정지</AppButton>
                  ) : (
                    <AppButton onClick={() => handleUnblock(user.userId)}>해제</AppButton>
                  )}
                </ButtonWrapper>
              </TableRow>
            ))}
          </Table>

          {totalPages > 1 && (
            <PaginationWrapper>
              <PaginationButton onClick={() => fetchUsers(currentPage - 1)} disabled={currentPage === 0}>
                이전
              </PaginationButton>
              <PageInfo>
                {currentPage + 1} / {totalPages}
              </PageInfo>
              <PaginationButton onClick={() => fetchUsers(currentPage + 1)} disabled={currentPage >= totalPages - 1}>
                다음
              </PaginationButton>
            </PaginationWrapper>
          )}
        </>
      )}
    </Container>
  );
};

export default UserManagement;
