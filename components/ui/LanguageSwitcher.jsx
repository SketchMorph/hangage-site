"use client";
import { useRouter, usePathname } from "next/navigation";

const SUPPORTED_LANGS = {
  ko: "한국어",
  en: "English",
  fr: "Français",
  ja: "日本語",
  zh: "中文"
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLang = (lang) => {
    // 현재 경로에서 기존 언어코드 제거 후 새 언어코드 추가
    const newPath = "/" + lang + pathname.replace(/^\/[a-z]{2}/, "");
    router.push(newPath);
  };

  return (
    <select
      onChange={(e) => changeLang(e.target.value)}
      defaultValue={pathname.split("/")[1] || "en"}
      className="border rounded px-2 py-1 text-sm"
    >
      {Object.entries(SUPPORTED_LANGS).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
