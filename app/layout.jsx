import '../styles/globals.css';

export const metadata = {
  title: "한스타일 '밝은' 상점",
  description: "우리옷 상점, 한스타일 '밝은'상점",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
