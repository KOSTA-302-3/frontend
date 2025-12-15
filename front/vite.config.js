import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        // API 요청 경로 패턴
        target: "http://localhost:9000",
        changeOrigin: true,
      },
    },
  },
});
