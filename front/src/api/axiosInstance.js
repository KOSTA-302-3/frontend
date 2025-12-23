import axios from "axios";
const serverIp = import.meta.env.VITE_API_SERVER_IP;
const axiosInstance = axios.create({
  baseURL: serverIp,
  timeout: 5000,
  withCredentials: true, // 쿠키 자동 포함
});

axiosInstance.interceptors.response.use(
  (response) => {
    // 정상 응답이면 그대로 반환
    return response;
  },
  (error) => {
    // 서버에서 응답이 온 경우
    if (error.response) {
      const status = error.response.status;

      // 인증 안 된 상태
      if (status === 401) {
        console.warn("401 - 인증 만료 또는 로그인 필요");

        // 로그인 페이지로 이동
        window.location.href = "/login";
      }

      // 인증은 됐지만 권한 없음
      if (status === 403) {
        console.warn("403 - 권한 없음");
        alert("접근 권한이 없습니다.");
      }
    }

    // 에러를 다시 throw 해서
    // 개별 호출부에서도 catch 가능하게 함
    return Promise.reject(error);
  }
);

export default axiosInstance;
