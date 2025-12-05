import styled from "styled-components";
import { UserOutlined, FileTextOutlined, WarningOutlined } from "@ant-design/icons";

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
  margin-bottom: 2vh;
`;

const Title = styled.h1`
  font-size: 3vh;
  font-weight: bold;
  color: #333;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2vw;
`;

const StatCard = styled.div`
  background: white;
  padding: 3vh 2vw;
  border-radius: 2vh;
  box-shadow: 0 0.2vh 1vh rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

const StatIcon = styled.div`
  font-size: 4vh;
  color: ${props => props.$color || '#e6c0c7'};
`;

const StatValue = styled.div`
  font-size: 3.5vh;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 1.8vh;
  color: #666;
`;

const AdminDashboard = () => {
  return (
    <Container>
      <Header>
        <Title>관리자 대시보드</Title>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatIcon $color="#1da1f2">
            <UserOutlined />
          </StatIcon>
          <StatValue>1,234</StatValue>
          <StatLabel>총 사용자</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#52c41a">
            <FileTextOutlined />
          </StatIcon>
          <StatValue>5,678</StatValue>
          <StatLabel>총 게시물</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#ff4d4f">
            <WarningOutlined />
          </StatIcon>
          <StatValue>23</StatValue>
          <StatLabel>미처리 신고</StatLabel>
        </StatCard>
      </StatsGrid>
    </Container>
  );
};

export default AdminDashboard;
