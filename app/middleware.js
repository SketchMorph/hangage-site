import { NextResponse } from "next/server";

const SUPPORTED_LANGS = ["ko", "en", "fr", "ja", "zh"];
const DEFAULT_LANG = "en";

export function middleware(req) {
  const url = req.nextUrl.clone();

  // 이미 언어 경로가 붙어있으면 그대로 둠
  const hasLangPrefix = SUPPORTED_LANGS.some((lang) =>
    url.pathname.startsWith(`/${lang}`)
  );
  if (hasLangPrefix) return NextResponse.next();

  // 브라우저 언어 감지
  const acceptLang = req.headers.get("accept-language") || "";
  let userLang = acceptLang.split(",")[0].split("-")[0]; // 예: "fr-CA" → "fr"

  if (!SUPPORTED_LANGS.includes(userLang)) {
    userLang = DEFAULT_LANG; // 지원하지 않는 언어 → 영어
  }

  // 해당 언어 경로로 리다이렉트
  url.pathname = `/${userLang}${url.pathname}`;
  return NextResponse.redirect(url);
}
