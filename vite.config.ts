import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Kiểm tra xem đang chạy lệnh gì: 'serve' là dev, 'build' là deploy
  const isDev = command === 'serve';

  return {
    plugins: [
      tailwindcss(),
      react()
    ],
    // QUAN TRỌNG: Cấu hình đường dẫn cơ sở
    // - Nếu đang chạy dev trên máy: dùng '/'
    // - Nếu build lên mạng: dùng tên Repository của bạn
    // HÃY ĐỔI '/Game_Store/' THÀNH TÊN REPO TRÊN GITHUB CỦA BẠN
    base: isDev ? '/' : '/Game_Store/', 
  }
})