import { useState, useEffect } from "react";
import { UserOutlined, FileTextOutlined, WarningOutlined, UserAddOutlined } from "@ant-design/icons";
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
import { getDashboardStats } from "../../api/adminApi";
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
      const data = await getDashboardStats();
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

  // 가입자 현황 차트
  const userStatusChartData = {
    labels: ['기존 가입자', '오늘 가입자'],
    datasets: [
      {
        label: '가입자 수',
        data: [stats.totalUsers - stats.todayUsers, stats.todayUsers],
        backgroundColor: [
          'rgba(255, 182, 193, 0.85)',
          'rgba(173, 216, 230, 0.85)',
        ],
        borderColor: [
          'rgba(255, 182, 193, 1)',
          'rgba(173, 216, 230, 1)',
        ],
        borderWidth: 2,
        borderRadius: 12,
        borderSkipped: false,
      },
    ],
  };

  // 정지 유저 현황 차트
  const reportedUsersChartData = {
    labels: ['활성 유저', '정지 유저'],
    datasets: [
      {
        label: '유저 수',
        data: [stats.activeUsers, stats.bannedUsers],
        backgroundColor: [
          'rgba(152, 251, 152, 0.85)',
          'rgba(255, 160, 122, 0.85)',
        ],
        borderColor: [
          'rgba(152, 251, 152, 1)',
          'rgba(255, 160, 122, 1)',
        ],
        borderWidth: 2,
        borderRadius: 12,
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: 16,
        cornerRadius: 12,
        titleFont: {
          size: 16,
          weight: 'bold',
          family: "'Noto Sans KR', sans-serif"
        },
        bodyFont: {
          size: 14,
          family: "'Noto Sans KR', sans-serif"
        },
        displayColors: true,
        boxWidth: 12,
        boxHeight: 12,
        boxPadding: 8,
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          lineWidth: 1,
        },
        ticks: {
          font: {
            size: 13,
            weight: '600',
            family: "'Noto Sans KR', sans-serif"
          },
          color: '#6b7280',
          padding: 10,
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            weight: '600',
            family: "'Noto Sans KR', sans-serif"
          },
          color: '#374151',
          padding: 10,
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce',
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default') {
          delay = context.dataIndex * 400 + 300;
        }
        return delay;
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    }
  };

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