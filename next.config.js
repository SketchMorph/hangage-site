/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ❌ i18n 제거
  // 우리는 app/[lang]/page.jsx 방식으로 다국어 라우팅을 직접 처리하기 때문에
  // Next.js의 i18n 기능은 충돌을 일으켜 500 에러를 발생시킵니다.
};

module.exports = nextConfig;
