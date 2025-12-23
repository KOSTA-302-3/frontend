/**
 * 환경 변수 및 공통 API 유틸리티
 */

export const API_BASE_URL = import.meta.env.VITE_API_SERVER_IP || 'http://localhost:9000';

/**
 * 공통 API 호출 헬퍼 함수
 * @param {string} endpoint - API 엔드포인트 (예: '/admin/users')
 * @param {object} options - fetch 옵션
 * @returns {Promise} - API 응답 데이터
 */
export const fetchAPI = async (endpoint, options = {}) => {
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
  
  return response.json();
};

export default API_BASE_URL;
