import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ['styled-components']  // ⬅️ 添加这行！
  },
  
  server: {
    proxy: {
      '/v2': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v2/, '')
      }
    }
  }
  
});
