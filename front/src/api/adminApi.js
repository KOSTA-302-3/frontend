import apiClient from './apiClient';

/**
 * Admin API 함수들
 * 백엔드 AdminController와 연동
 */

// 대시보드 통계 조회
export const getDashboardStats = async () => {
  const response = await apiClient.get('/admin/dashboard/stats');
  return response.data;
};

// 전체 유저 목록 조회 (페이징)
export const getAllUsers = async (page = 0) => {
  const response = await apiClient.get(`/admin/users/${page}`);
  return response.data;
};

// 상태별 유저 목록 조회 (드롭다운 필터용)
// status: ALL, ACTIVE, BANNED
export const getAdminUsersByStatus = async (status, page = 0) => {
  const response = await apiClient.get(`/admin/users/filter/${status}/${page}`);
  return response.data;
};

// 유저 상세 조회
export const getUserDetail = async (userId) => {
  const response = await apiClient.get(`/admin/users/detail/${userId}`);
  return response.data;
};

// 유저 정지 (기간별)
// days: 7(7일), 30(30일), 365(1년), -1(영구)
export const suspendUser = async (userId, days, category, detail) => {
  const response = await apiClient.post(`/admin/users/${userId}/suspend`, {
    days,
    category,
    detail,
  });
  return response.data;
};

// 유저 정지 해제
export const activateUser = async (userId) => {
  const response = await apiClient.put(`/admin/users/${userId}/activate`);
  return response.data;
};

// 유저 탈퇴 처리 (소프트 삭제)
export const deactivateUser = async (userId) => {
  const response = await apiClient.delete(`/admin/users/${userId}/deactivate`);
  return response.data;
};

// 유저 정지 내역 조회
export const getUserBans = async (userId) => {
  const response = await apiClient.get(`/admin/users/${userId}/bans`);
  return response.data;
};

// 관리자용 신고 목록 조회 (페이징) - 정지 이력 포함
// type: USER, POST, REPLY
export const getAdminReports = async (type, page = 0) => {
  const response = await apiClient.get(`/admin/reports/${type}/${page}`);
  return response.data;
};

// 신고 승인 (유저 정지 + 신고 삭제)
// days: 7(7일), 30(30일), 365(1년), -1(영구)
export const approveReport = async (reportId, days = 7) => {
  const response = await apiClient.post(`/admin/reports/${reportId}/approve?days=${days}`);
  return response.data;
};

// 신고 거절 (신고만 삭제)
export const rejectReport = async (reportId) => {
  const response = await apiClient.delete(`/admin/reports/${reportId}`);
  return response.data;
};
