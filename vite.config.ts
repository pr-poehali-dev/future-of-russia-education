import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ["preview--future-of-russia-education.poehali.dev"], // Явно указываем допустимый хост
    hmr: {
      host: 'localhost', // Используем localhost для HMR соединений
      protocol: 'ws', // Используем ws протокол
      clientPort: 443, // Порт для клиента за прокси
      overlay: false, // Отключаем оверлей с ошибками
    }
  },
});
