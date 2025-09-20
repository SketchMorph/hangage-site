"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

// 다국어 JSON import
import enDict from "@/locales/en.json";
import koDict from "@/locales/ko.json";
import frDict from "@/locales/fr.json";
import jaDict from "@/locales/ja.json";
import zhDict from "@/locales/zh.json";

const dictionaries = { en: enDict, ko: koDict, fr: frDict, ja: jaDict, zh: zhDict };
const SUPPORTED_LANGS = ["en", "ko", "fr", "ja", "zh"];

export default function Navbar() {
  const pathname = usePathname();
  let lang = pathname.split("/")[1];
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = "en";
  }
  const dict = dictionaries[lang] || dictionaries["en"];

  // 현재 페이지 체크 (활성화 스타일 적용)
  const isActive = (href) => pathname.startsWith(href);

  return (
    <nav className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm shadow sticky top-0 z-50">
      {/* 로고 / 홈 */}
      <Link
        href={`/${lang}`}
        className="text-2xl font-bold tracking-wide hover:text-blue-600"
      >
        {dict.navbar.home}
      </Link>

      {/* 메뉴 */}
      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href={`/${lang}/products`}
          className={isActive(`/${lang}/products`)
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600"}
        >
          {dict.navbar.products}
        </Link>

        <Link
          href={`/${lang}/lookbook/new`}
          className={isActive(`/${lang}/lookbook`)
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600"}
        >
          {dict.navbar.lookbook}
        </Link>

        <Link
          href={`/${lang}/about`}
          className={isActive(`/${lang}/about`)
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600"}
        >
          {dict.navbar.about}
        </Link>

        <Link
          href={`/${lang}/contact`}
          className={isActive(`/${lang}/contact`)
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600"}
        >
          {dict.navbar.contact}
        </Link>

        <Link
          href={`/${lang}/admin`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          {dict.navbar.admin}
        </Link>

        {/* 언어 선택 */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
