import "../styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import { useParams } from "next/navigation";

export const metadata = {
  title: "한스타일",
  description: "생활한복 상점 사이트",
};

export default function RootLayout({ children }) {
  // Next.js App Router에서는 params.lang을 RootLayout에서 직접 못 쓰므로,
  // generateStaticParams / parallel routes 등을 쓰는 게 정석이에요.
  // 하지만 간단히 하려면 default lang="ko"로 두고,
  // 각 [lang]/layout.jsx 파일에서 오버라이드 하는 게 좋아요.

  return (
    <html lang="ko"> {/* 기본값: 한국어 */}
      <head>
        {/* ✅ 중국어 폰트 불러오기 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
