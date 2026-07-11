import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/saji-image-processing-web/",
  // articles-worker の CORS 許可リスト（http://localhost:3000）に合わせる。
  // 別ポートにフォールバックすると許可リスト外の origin になり記事取得が
  // CORS で弾かれ 404 になる（#143）ため、strictPort で衝突時は明示的に落とす。
  server: { port: 3000, strictPort: true },
  preview: { port: 3000, strictPort: true },
});
