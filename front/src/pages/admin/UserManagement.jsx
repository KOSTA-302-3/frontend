import { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import AppButton from "../../components/common/AppButton";
import { 
  Container, 
  Header, 
  Title, 
  SearchWrapper, 
  Table, 
  TableHeader, 
  TableRow, 
  UserInfo, 
  Avatar, 
  StatusBadge, 
  ButtonWrapper 
} from "./UserManagement.styles";

const UserManagement = () => {
  const [users] = useState([
    { id: 1, username: "santa_user", email: "santa@example.com", status: "active", joinDate: "2024-01-15" },
    { id: 2, username: "test_user", email: "test@example.com", status: "active", joinDate: "2024-02-20" },
    { id: 3, username: "blocked_user", email: "blocked@example.com", status: "blocked", joinDate: "2024-03-10" },
  ]);

  const handleBlock = (userId) => {
    console.log("정지:", userId);
  };

  const handleUnblock = (userId) => {
    console.log("해제:", userId);
  };

  return (
    <Container>
      <Header>
        <Title>사용자 관리</Title>
        <SearchWrapper>
          <SearchBar />
        </SearchWrapper>
      </Header>

      <Table>
        <TableHeader>
          <div>사용자</div>
          <div>이메일</div>
          <div>상태</div>
          <div>관리</div>
        </TableHeader>
        {users.map(user => (
          <TableRow key={user.id}>
            <UserInfo>
              <Avatar>{user.username[0].toUpperCase()}</Avatar>
              <span>{user.username}</span>
            </UserInfo>
            <div>{user.email}</div>
            <div>
              <StatusBadge $active={user.status === "active"}>
                {user.status === "active" ? "활성" : "정지"}
              </StatusBadge>
            </div>
            <ButtonWrapper>
              {user.status === "active" ? (
                <AppButton onClick={() => handleBlock(user.id)}>정지</AppButton>
              ) : (
                <AppButton onClick={() => handleUnblock(user.id)}>해제</AppButton>
              )}
            </ButtonWrapper>
          </TableRow>
        ))}
      </Table>
    </Container>
  );
};

export default UserManagement;
