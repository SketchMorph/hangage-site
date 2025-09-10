"use client";
import HanbokLanding from "../_landing/HanbokLanding";

const SUPPORTED_LANGS = ["ko", "en", "fr", "ja", "zh"];

export default function LangHomePage({ params }) {
  let { lang } = params;

  // 지원하지 않는 언어 → 기본 ko
  if (!SUPPORTED_LANGS.includes(lang)) lang = "ko";

  return <HanbokLanding lang={lang} />;
}
