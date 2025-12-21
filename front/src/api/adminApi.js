/**
 * Admin API 함수들
 * 백엔드 AdminController와 연동
 * axios를 사용하여 API 호출
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_SERVER_IP || 'http://localhost:9000';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 대시보드 통계 조회
export const getDashboardStats = async () => {
  return apiClient.get('/admin/dashboard/stats');
};

// 전체 유저 목록 조회 (페이징)
export const getAllUsers = async (page = 0) => {
  return apiClient.get(`/admin/users/${page}`);
};

// 상태별 유저 목록 조회 (드롭다운 필터용)
// status: ALL, ACTIVE, BANNED
export const getAdminUsersByStatus = async (status, page = 0) => {
  return apiClient.get(`/admin/users/filter/${status}/${page}`);
};

// 유저 상세 조회
export const getUserDetail = async (userId) => {
  return apiClient.get(`/admin/users/detail/${userId}`);
};

// 유저 정지 (기간별)
// days: 7(7일), 30(30일), 365(1년), -1(영구)
export const suspendUser = async (userId, days, category, detail) => {
  return apiClient.post(`/admin/users/${userId}/suspend`, { days, category, detail });
};

// 유저 정지 해제
export const activateUser = async (userId) => {
  return apiClient.put(`/admin/users/${userId}/activate`);
};

// 유저 탈퇴 처리 (소프트 삭제)
export const deactivateUser = async (userId) => {
  return apiClient.delete(`/admin/users/${userId}/deactivate`);
};

// 유저 정지 내역 조회
export const getUserBans = async (userId) => {
  return apiClient.get(`/admin/users/${userId}/bans`);
};

// 관리자용 신고 목록 조회 (페이징) - 정지 이력 포함
// type: USER, POST, REPLY
export const getAdminReports = async (type, page = 0) => {
  return apiClient.get(`/admin/reports/${type}/${page}`);
};

// 신고 승인 (유저 정지 + 신고 삭제)
// days: 7(7일), 30(30일), 365(1년), -1(영구)
export const approveReport = async (reportId, days = 7) => {
  return apiClient.post(`/admin/reports/${reportId}/approve?days=${days}`);
};

// 신고 거절 (신고만 삭제)
export const rejectReport = async (reportId) => {
  return apiClient.delete(`/admin/reports/${reportId}`);
};
