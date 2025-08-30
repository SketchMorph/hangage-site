"use client";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher"; // 대소문자 일치 확인!

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow">
      <Link href="/" className="text-2xl font-bold">
        생활한복 한가게
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/products" className="hover:text-blue-600">상품목록</Link>
        <Link href="/login" className="hover:text-blue-600">로그인</Link>
        <Link href="/signup" className="hover:text-blue-600">회원가입</Link>
        <Link href="/admin" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">상품 등록</Link>
        <LanguageSwitcher /> {/* 언어 선택 */}
      </div>
    </nav>
  );
}
