"use client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
const SUPPORTED_LANGS = ["en", "ko", "fr", "ja", "zh"];

export default function HanbokLanding() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [adminOpen, setAdminOpen] = useState(false);

  const pathname = usePathname();
  let lang = pathname.split("/")[1];
  if (!SUPPORTED_LANGS.includes(lang)) {
    lang = "en"; // 기본 언어
  }

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
              <Link href={`/${lang}/products`}>
                <Button size="lg" className="rounded-2xl bg-blue-900 hover:bg-blue-800">
                  신상품 보기
                </Button>
              </Link>
              <Link href={`/${lang}/lookbook`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  룩북 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 나머지 카테고리/베스트/스토리/사이즈/리뷰/매장안내/푸터/관리자 패널은 동일 */}
    </div>
  );
}
