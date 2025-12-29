/**
 * Chart.js 설정 파일
 * 차트 옵션과 데이터 생성 함수들
 */

/**
 * 공통 Bar 차트 옵션
 */
export const barChartOptions = {
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
      ticks: {
        stepSize: 1,
        font: {
          size: 13,
          weight: '600',
          family: "'Noto Sans KR', sans-serif"
        },
        color: '#6b7280',
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        lineWidth: 1,
      }
    },
    x: {
      ticks: {
        font: {
          size: 13,
          weight: '600',
          family: "'Noto Sans KR', sans-serif"
        },
        color: '#6b7280',
      },
      grid: {
        display: false,
      }
    }
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
      hitRadius: 10,
    }
  }
};

/**
 * 최근 7일 가입자 차트 데이터 생성
 */
export const createWeeklyUserChartData = (weeklyStats) => {
  if (!weeklyStats || weeklyStats.length === 0) {
    return {
      labels: [],
      datasets: []
    };
  }

  return {
    labels: weeklyStats.map(stat => stat.date),
    datasets: [
      {
        label: '가입자 수',
        data: weeklyStats.map(stat => stat.count),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };
};

/**
 * 최근 7일 게시글 차트 데이터 생성
 */
export const createWeeklyPostChartData = (weeklyStats) => {
  if (!weeklyStats || weeklyStats.length === 0) {
    return {
      labels: [],
      datasets: []
    };
  }

  return {
    labels: weeklyStats.map(stat => stat.date),
    datasets: [
      {
        label: '게시글 수',
        data: weeklyStats.map(stat => stat.count),
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };
};

/**
 * 가입자 현황 차트 데이터 생성 (사용 안 함 - 삭제 예정)
 * @param {number} totalUsers - 총 가입자 수
 * @param {number} todayUsers - 오늘 가입자 수
 */
export const createUserStatusChartData = (totalUsers, todayUsers) => ({
  labels: ['기존 가입자', '오늘 가입자'],
  datasets: [
    {
      label: '가입자 수',
      data: [totalUsers - todayUsers, todayUsers],
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
});

/**
 * 정지 유저 현황 차트 데이터 생성
 * @param {number} activeUsers - 활성 유저 수
 * @param {number} bannedUsers - 정지 유저 수
 */
export const createReportedUsersChartData = (activeUsers, bannedUsers) => ({
  labels: ['활성 유저', '정지 유저'],
  datasets: [
    {
      label: '유저 수',
      data: [activeUsers, bannedUsers],
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
});
