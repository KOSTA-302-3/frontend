import { UserOutlined, FileTextOutlined, WarningOutlined } from "@ant-design/icons";
import { Container, Header, Title, StatsGrid, StatCard, StatIcon, StatValue, StatLabel } from "./AdminDashboard.styles";

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
