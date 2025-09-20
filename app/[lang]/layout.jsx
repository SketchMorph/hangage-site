import "../../styles/globals.css";
import Navbar from "@/components/ui/Navbar";

export default function LangLayout({ children, params }) {
  const { lang } = params;

  return (
    <html lang={lang}>
      <head>
        {/* ✅ 중국어 전용 폰트 로드 */}
        {lang === "zh" && (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&display=swap"
            rel="stylesheet"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
