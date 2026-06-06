import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://azentrix-fullstack-task2-6mn2.onrender.com",
        changeOrigin: true,
      },
      "/socket.io": {
        target: "https://azentrix-fullstack-task2-6mn2.onrender.com",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
