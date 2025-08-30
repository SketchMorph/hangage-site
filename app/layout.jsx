import "../styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import { usePathname } from "next/navigation";

export const metadata = {
  title: "한스타일",
  description: "생활한복 상점 사이트",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "ko"; // URL 첫 부분 (/ko, /en...)

  return (
    <html lang={currentLang}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
