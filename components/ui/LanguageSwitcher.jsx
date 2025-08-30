"use client";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLang = (lang) => {
    const newPath = "/" + lang + pathname.replace(/^\/[a-z]{2}/, "");
    router.push(newPath);
  };

  return (
    <select
      onChange={(e) => changeLang(e.target.value)}
      defaultValue={pathname.split("/")[1] || "ko"}
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
