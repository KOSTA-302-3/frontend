/**
 * Admin API 함수들
 * 백엔드 AdminController와 연동
 * 환경 변수를 직접 사용하여 API 호출
 */

const API_BASE_URL = import.meta.env.VITE_API_SERVER_IP || 'http://localhost:9000';

// API 호출 헬퍼 함수
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // 204 No Content 또는 응답 본문이 없는 경우 처리
  const contentType = response.headers.get('content-type');
  if (response.status === 204 || !contentType || !contentType.includes('application/json')) {
    return null;
  }
  
  return response.json();
};

// 대시보드 통계 조회
export const getDashboardStats = async () => {
  return fetchAPI('/admin/dashboard/stats');
};

// 전체 유저 목록 조회 (페이징)
export const getAllUsers = async (page = 0) => {
  return fetchAPI(`/admin/users/${page}`);
};

// 상태별 유저 목록 조회 (드롭다운 필터용)
// status: ALL, ACTIVE, BANNED
export const getAdminUsersByStatus = async (status, page = 0) => {
  return fetchAPI(`/admin/users/filter/${status}/${page}`);
};

// 유저 상세 조회
export const getUserDetail = async (userId) => {
  return fetchAPI(`/admin/users/detail/${userId}`);
};

// 유저 정지 (기간별)
// days: 7(7일), 30(30일), 365(1년), -1(영구)
export const suspendUser = async (userId, days, category, detail) => {
  return fetchAPI(`/admin/users/${userId}/suspend`, {
    method: 'POST',
    body: JSON.stringify({ days, category, detail }),
  });
};

// 유저 정지 해제
export const activateUser = async (userId) => {
  return fetchAPI(`/admin/users/${userId}/activate`, {
    method: 'PUT',
  });
};

// 유저 탈퇴 처리 (소프트 삭제)
export const deactivateUser = async (userId) => {
  return fetchAPI(`/admin/users/${userId}/deactivate`, {
    method: 'DELETE',
  });
};

// 유저 정지 내역 조회
export const getUserBans = async (userId) => {
  return fetchAPI(`/admin/users/${userId}/bans`);
};

// 관리자용 신고 목록 조회 (페이징) - 정지 이력 포함
// type: USER, POST, REPLY
export const getAdminReports = async (type, page = 0) => {
  return fetchAPI(`/admin/reports/${type}/${page}`);
};

// 신고 승인 (유저 정지 + 신고 삭제)
// days: 7(7일), 30(30일), 365(1년), -1(영구)
export const approveReport = async (reportId, days = 7) => {
  return fetchAPI(`/admin/reports/${reportId}/approve?days=${days}`, {
    method: 'POST',
  });
};

// 신고 거절 (신고만 삭제)
export const rejectReport = async (reportId) => {
  return fetchAPI(`/admin/reports/${reportId}`, {
    method: 'DELETE',
  });
};
