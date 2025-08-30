import { NextResponse } from "next/server";

const SUPPORTED_LANGS = ["ko", "en", "fr", "ja", "zh"];
const DEFAULT_LANG = "en";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // 정적 파일(_next, api, favicon 등)은 건너뛰기
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 이미 언어 코드가 붙어있으면 그대로 두기
  const hasLangPrefix = SUPPORTED_LANGS.some((lang) =>
    pathname.startsWith(`/${lang}`)
  );
  if (hasLangPrefix) return NextResponse.next();

  // 브라우저 언어 감지
  const acceptLang = req.headers.get("accept-language") || "";
  let userLang = acceptLang.split(",")[0].split("-")[0]; // 예: fr-CA → fr

  if (!SUPPORTED_LANGS.includes(userLang)) {
    userLang = DEFAULT_LANG;
  }

  // 자동 리다이렉트
  url.pathname = `/${userLang}${pathname}`;
  return NextResponse.redirect(url);
}
