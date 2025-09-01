/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["ko", "en", "fr", "ja", "zh"], // 지원 언어
    defaultLocale: "ko",                     // 기본 언어
  },
};

module.exports = nextConfig;
