import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/common/SearchBar";
import AppButton from "../../components/common/AppButton";

const Container = styled.div`
  padding: 3vh 3vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3vh;
  font-weight: bold;
  color: #333;
`;

const SearchWrapper = styled.div`
  width: 40vw;
`;

const Table = styled.div`
  background: white;
  border-radius: 2vh;
  box-shadow: 0 0.2vh 1vh rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 2fr;
  padding: 2vh 2vw;
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
  font-size: 1.8vh;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 2fr;
  padding: 2vh 2vw;
  border-bottom: 0.1vh solid #f0f0f0;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
`;

const Avatar = styled.div`
  width: 4vh;
  height: 4vh;
  border-radius: 50%;
  background: #e6c0c7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const StatusBadge = styled.span`
  padding: 0.5vh 1vw;
  border-radius: 1vh;
  font-size: 1.5vh;
  background: ${props => props.$active ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$active ? '#155724' : '#721c24'};
`;

const ButtonWrapper = styled.div`
  width: 10vw;
`;

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
