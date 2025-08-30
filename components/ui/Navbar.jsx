"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher"; // 추가

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow">
      {/* 로고 */}
      <Link href="/" className="text-2xl font-bold">
        한스타일
      </Link>

      {/* 메뉴 */}
      <div className="flex items-center space-x-4">
        <Link href="/products" className="hover:text-blue-600">
          상품목록
        </Link>
        <Link href="/login" className="hover:text-blue-600">
          로그인
        </Link>
        <Link href="/signup" className="hover:text-blue-600">
          회원가입
        </Link>
        <Link
          href="/admin"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          상품 등록
        </Link>

        {/* 언어 선택 드롭다운 */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
