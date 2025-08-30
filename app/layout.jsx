import "../styles/globals.css";
import Navbar from "@/components/ui/Navbar";

export const metadata = {
  title: "한스타일",
  description: "생활한복 상점 사이트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko"> {/* 기본값: 한국어 */}
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
