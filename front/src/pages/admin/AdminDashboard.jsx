import { useState, useEffect } from "react";
import { UserOutlined, FileTextOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axiosInstance from "../../api/axiosInstance";
import { 
  barChartOptions,
  createWeeklyUserChartData,
  createWeeklyPostChartData
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
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    todayUsers: 0,
    todayPosts: 0,
    weeklyUserStats: [],
    weeklyPostStats: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/admin/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error("대시보드 통계 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 차트 데이터 생성
  const weeklyUserChartData = createWeeklyUserChartData(stats.weeklyUserStats);
  const weeklyPostChartData = createWeeklyPostChartData(stats.weeklyPostStats);

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
          <ChartCardTitle>최근 7일 가입자 현황</ChartCardTitle>
          <div style={{ height: '250px' }}>
            <Line data={weeklyUserChartData} options={barChartOptions} />
          </div>
        </ChartCard>

        <ChartCard>
          <ChartCardTitle>최근 7일 게시글 현황</ChartCardTitle>
          <div style={{ height: '250px' }}>
            <Line data={weeklyPostChartData} options={barChartOptions} />
          </div>
        </ChartCard>
      </ChartsGrid>
    </Container>
  );
};

export default AdminDashboard;