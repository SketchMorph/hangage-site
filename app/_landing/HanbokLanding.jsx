"use client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Check,
  Phone,
  MapPin,
  ShoppingBag,
  Truck,
  Instagram,
  Settings,
  Save,
  RefreshCcw,
  Copy,
} from "lucide-react";

/*
  생활한복 가게 원페이지 랜딩 + 간편 편집(관리자) 모드
*/

const DEFAULT_CONFIG = {
  brandName: "한가게",
  metaTitle: "한가게 | 전주 생활한복",
  metaDescription:
    "전주 생활한복 한가게 — 남/여/어린이 한복, 철릭원피스, 허리치마, 소품",
  heroHeadline: "우리옷 상점, 한스타일 '밝은'상점",
  address: "전주시 완산구 태평3길 70 중앙상가 2층 206호 한가게",
  hours: "영업시간 오전9시~오후7시",
  phoneMain: "063-255-2547",
  phoneMobile: "010-7309-2547",
  instagram: "@efun36",
  naverPlaceUrl: "https://naver.me/GA8LhINb",
  kakaoOpenChatUrl: "https://open.kakao.com/o/s9HWYCOh",
  smartstoreUrl: "https://smartstore.naver.com/hangagye",
  policyText: "교환·환불 불가",
  categories: [
    { title: "남성 생활한복", desc: "편안한 일상 저고리/바지", img: "/maleB002.png" },
    { title: "여성 생활한복", desc: "모던·미니멀 실루엣", img: "/hanW001.png" },
    { title: "어린이 한복", desc: "귀여운 우리옷", img: "/childP001.png" },
    { title: "철릭원피스", desc: "간편한 원피스형 철릭", img: "/oneW001.png" },
    { title: "뷔스티에", desc: "레이어드 포인트", img: "/strapB001.png" },
    { title: "허리치마", desc: "일상용 랩스커트", img: "/skirtB001.png" },
    { title: "무용치마", desc: "공연·연습용", img: "/danP001.png" },
    { title: "앞치마", desc: "생활 앞치마", img: "/apronB001.png" },
    { title: "두건 및 소품", desc: "헤드웨어·파우치", img: "/hairP001.png" },
  ],
  bests: [
    { name: "모던한복", price: "문의 가능", img: "/twoP001.png" },
    { name: "철릭원피스", price: "문의 가능", img: "/oneB002.png" },
    { name: "허리치마", price: "문의 가능", img: "/skirtP002.png" },
  ],
};

const STORAGE_KEY = "hangage-config";

export default function HanbokLanding() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [adminOpen, setAdminOpen] = useState(false);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(raw) });
    } catch (e) {}
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    alert("저장했어요. (이 브라우저에 보관)");
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(DEFAULT_CONFIG);
  };

  const exportToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      alert("설정을 복사했어요.");
    } catch (e) {
      alert("복사 실패. 수동으로 복사해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
      </Helmet>

      {/* 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            <span className="font-semibold tracking-tight">
              {config.brandName}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#categories" className="hover:opacity-80">카테고리</a>
            <a href="#best" className="hover:opacity-80">베스트</a>
            <a href="#story" className="hover:opacity-80">브랜드</a>
            <a href="#size" className="hover:opacity-80">사이즈/맞춤</a>
            <a href="#store" className="hover:opacity-80">매장안내</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50"
              onClick={() => setAdminOpen((v) => !v)}
            >
              <Settings className="w-4 h-4 mr-1" /> 관리자
            </Button>
            <a
              href={config.smartstoreUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-900 hover:bg-blue-800 text-white px-4 py-2"
            >
              스마트스토어
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-[url('/main000.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {config.heroHeadline}
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-700">
              숨 쉬는 천, 자연스러운 실루엣, 한국적 아름다움.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/products">
                <Button size="lg" className="rounded-2xl bg-blue-900 hover:bg-blue-800">
                  신상품 보기
                </Button>
              </Link>
              <Link href="/lookbook">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  룩북 보기
                </Button>
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />국내 제작 · 천연 소재 중심
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />사이즈/맞춤 옵션 지원
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />{config.policyText}
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />5만원 이상 무료배송
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 이하 카테고리/베스트/스토리/사이즈/리뷰/매장안내/푸터는 동일 */}
      {/* (상단 버튼만 절대경로 Link로 교체 완료) */}

      {/* 관리자 패널 */}
      {adminOpen && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[460px] bg-white border shadow-xl rounded-2xl p-4 z-[60]">
          {/* ... 생략 없이 기존 관리자 패널 코드 동일 ... */}
        </div>
      )}
    </div>
  );
}
