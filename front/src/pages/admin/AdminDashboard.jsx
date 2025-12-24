import { useState, useEffect } from "react";
import { UserOutlined, FileTextOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axiosInstance from "../../api/axiosInstance";
import { 
  barChartOptions,
  createUserStatusChartData,
  createReportedUsersChartData
} from "./chartConfig";
import { 
  Container, 
  Header, 
  Title, 
  StatsGrid, 
  StatCard, 
  StatIcon, 
  StatValue, 
  StatLabel,
  ChartsGrid,
  ChartCard,
  ChartTitle as ChartCardTitle,
  LoadingMessage
} from "./AdminDashboard.styles";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    todayUsers: 0,
    todayPosts: 0,
    activeUsers: 0,
    bannedUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/admin/dashboard/stats');
      const data = response.data;
      // 임시로 활성/정지 유저 계산 (실제론 백엔드에서 받아야 함)
      const activeUsers = Math.floor(data.totalUsers * 0.95);
      const bannedUsers = data.totalUsers - activeUsers;
      
      setStats({
        ...data,
        activeUsers,
        bannedUsers
      });
    } catch (error) {
      console.error("대시보드 통계 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 차트 데이터 생성
  const userStatusChartData = createUserStatusChartData(stats.totalUsers, stats.todayUsers);
  const reportedUsersChartData = createReportedUsersChartData(stats.activeUsers, stats.bannedUsers);

  if (loading) {
    return (
      <Container>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </Container>
    );
  }

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
          <StatValue>{stats.totalUsers.toLocaleString()}</StatValue>
          <StatLabel>총 가입자</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#52c41a">
            <UserAddOutlined />
          </StatIcon>
          <StatValue>{stats.todayUsers.toLocaleString()}</StatValue>
          <StatLabel>오늘 가입자</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon $color="#faad14">
            <FileTextOutlined />
          </StatIcon>
          <StatValue>{stats.todayPosts.toLocaleString()}</StatValue>
          <StatLabel>오늘 게시글</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartCardTitle>가입자 현황</ChartCardTitle>
          <div style={{ height: '250px' }}>
            <Bar data={userStatusChartData} options={barChartOptions} />
          </div>
        </ChartCard>

        <ChartCard>
          <ChartCardTitle>정지 유저 현황</ChartCardTitle>
          <div style={{ height: '250px' }}>
            <Bar data={reportedUsersChartData} options={barChartOptions} />
          </div>
        </ChartCard>
      </ChartsGrid>
    </Container>
  );
};

export default AdminDashboard;