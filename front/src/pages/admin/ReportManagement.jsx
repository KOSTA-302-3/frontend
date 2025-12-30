import { useState, useEffect } from "react";
import AppButton from "../../components/common/AppButton";
import axiosInstance from "../../api/axiosInstance";
import {
  Container,
  Header,
  Title,
  TypeSelect,
  Table,
  TableHeader,
  TableRow,
  ActionButtons,
  ButtonWrapper,
  LoadingMessage,
  PaginationWrapper,
  PaginationButton,
  PageInfo,
} from "./ReportManagement.styles";

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reportType, setReportType] = useState("USER"); // USER, POST, REPLY

  // 신고 목록 불러오기
  const fetchReports = async (type = "USER", page = 0) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/admin/reports/${type}/${page}`);
      setReports(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
      setCurrentPage(page);
      setReportType(type);
    } catch (error) {
      console.error("신고 목록 조회 실패:", error);
      alert(`신고 목록을 불러오는데 실패했습니다.\n에러: ${error.response?.status || error.message}`);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports("USER", 0);
  }, []);

  const handleApprove = async (reportId) => {
    const days = prompt("정지 기간을 선택하세요:\n7 = 7일\n30 = 30일\n365 = 1년\n-1 = 영구", "7");
    if (days === null) return;

    const daysNum = parseInt(days);
    if (![7, 30, 365, -1].includes(daysNum)) {
      alert("7, 30, 365, -1 중 하나를 입력하세요.");
      return;
    }

    if (!confirm(`이 신고를 승인하고 유저를 ${daysNum === -1 ? "영구" : daysNum + "일"} 정지시키겠습니까?`)) return;

    try {
      await axiosInstance.post(`/api/admin/reports/${reportId}/approve?days=${daysNum}`);
      alert("신고가 승인되었고 유저가 정지되었습니다.");
      fetchReports(reportType, currentPage);
    } catch (error) {
      console.error("신고 승인 실패:", error);
      alert("신고 승인에 실패했습니다.");
    }
  };

  const handleReject = async (reportId) => {
    if (!confirm("이 신고를 거절하시겠습니까? (신고만 삭제됩니다)")) return;

    try {
      await axiosInstance.delete(`/api/admin/reports/${reportId}`);
      alert("신고가 거절되었습니다.");
      fetchReports(reportType, currentPage);
    } catch (error) {
      console.error("신고 거절 실패:", error);
      alert("신고 거절에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>신고 관리</Title>
        <TypeSelect value={reportType} onChange={(e) => fetchReports(e.target.value, 0)}>
          <option value="USER">유저 신고</option>
          <option value="POST">게시물 신고</option>
          <option value="REPLY">댓글 신고</option>
        </TypeSelect>
      </Header>

      {loading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : (
        <>
          <Table>
            <TableHeader>
              <div>신고자</div>
              <div>대상</div>
              <div>정지 이력</div>
              <div>사유</div>
              <div>신고일시</div>
              <div>관리</div>
            </TableHeader>
            {reports.map((report) => (
              <TableRow key={report.reportId}>
                <div>{report.username}</div>
                <div>{report.targetUsername}</div>
                <div
                  style={{
                    color: report.banCount > 0 ? "red" : "inherit",
                    fontWeight: report.banCount > 0 ? "bold" : "normal",
                  }}
                >
                  {report.banCount > 0 ? `${report.banCount}회` : "없음"}
                </div>
                <div>{report.content || "사유 없음"}</div>
                <div>{new Date(report.createdAt).toLocaleDateString()}</div>
                <ActionButtons>
                  <ButtonWrapper>
                    <AppButton onClick={() => handleApprove(report.reportId)}>승인</AppButton>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <AppButton onClick={() => handleReject(report.reportId)}>거절</AppButton>
                  </ButtonWrapper>
                </ActionButtons>
              </TableRow>
            ))}
          </Table>

          {totalPages > 1 && (
            <PaginationWrapper>
              <PaginationButton onClick={() => fetchReports(reportType, currentPage - 1)} disabled={currentPage === 0}>
                이전
              </PaginationButton>
              <PageInfo>
                {currentPage + 1} / {totalPages}
              </PageInfo>
              <PaginationButton
                onClick={() => fetchReports(reportType, currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
              >
                다음
              </PaginationButton>
            </PaginationWrapper>
          )}
        </>
      )}
    </Container>
  );
};

export default ReportManagement;
