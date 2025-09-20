"use client";
import { usePathname, useRouter } from "next/navigation";

const SUPPORTED_LANGS = ["ko", "en", "fr", "ja", "zh"];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split("/")[1];
  const lang = SUPPORTED_LANGS.includes(currentLang) ? currentLang : "ko";

  function switchLanguage(newLang) {
    // 현재 경로에서 첫 번째 세그먼트를 언어코드로 교체
    const segments = pathname.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/") || "/";
    router.push(newPath);
  }

  return (
    <select
      value={lang}
      onChange={(e) => switchLanguage(e.target.value)}
      className="border rounded px-2 py-1"
    >
      <option value="ko">한국어</option>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="ja">日本語</option>
      <option value="zh">中文</option>
    </select>
  );
}
