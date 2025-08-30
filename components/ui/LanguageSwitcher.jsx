"use client";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = pathname.split("/")[1] || "en";

  const changeLang = (lang) => {
    const parts = pathname.split("/");
    parts[1] = lang; // 언어 prefix 교체
    const newPath = parts.join("/") || "/";
    router.push(newPath);
  };

  return (
    <select
      onChange={(e) => changeLang(e.target.value)}
      value={currentLang}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="ko">한국어</option>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="ja">日本語</option>
      <option value="zh">中文</option>
    </select>
  );
}
