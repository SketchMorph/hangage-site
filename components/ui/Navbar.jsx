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

const dictionaries = {
  en: enDict,
  ko: koDict,
  fr: frDict,
  ja: jaDict,
  zh: zhDict,
};

const SUPPORTED_LANGS = ["en", "ko", "fr", "ja", "zh"];

export default function Navbar() {
  const pathname = usePathname();
  let lang = pathname.split("/")[1];
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = "en"; // 기본 언어
  }

  const dict = dictionaries[lang] || dictionaries["en"];

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow">
      {/* 로고 / 홈 */}
      <Link href={`/${lang}`} className="text-2xl font-bold">
        {dict.navbar.home}
      </Link>

      {/* 메뉴 */}
      <div className="flex items-center space-x-4">
        <Link href={`/${lang}/products`} className="hover:text-blue-600">
          {dict.navbar.products}
        </Link>
        <Link href={`/${lang}/cart`} className="hover:text-blue-600">
          {dict.navbar.cart}
        </Link>
        <Link href={`/${lang}/orders`} className="hover:text-blue-600">
          {dict.navbar.orders || "Orders"}
        </Link>
        <Link href={`/${lang}/login`} className="hover:text-blue-600">
          {dict.navbar.login}
        </Link>
        <Link href={`/${lang}/signup`} className="hover:text-blue-600">
          {dict.navbar.signup}
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
