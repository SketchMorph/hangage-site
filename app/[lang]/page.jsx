"use client";

import HanbokLanding from "../_landing/HanbokLanding";

const SUPPORTED_LANGS = ["ko", "en", "fr", "ja", "zh"];

export default function LangHomePage({ params }) {
  let { lang } = params;

  // 지원하지 않는 언어면 ko로 fallback
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = "ko";
  }

  // ✅ lang props 전달
  return <HanbokLanding lang={lang} />;
}
