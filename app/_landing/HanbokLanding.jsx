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

// 다국어 JSON import
import enDict from "@/locales/en.json";
import koDict from "@/locales/ko.json";
import frDict from "@/locales/fr.json";
import jaDict from "@/locales/ja.json";
import zhDict from "@/locales/zh.json";

const dictionaries = { en: enDict, ko: koDict, fr: frDict, ja: jaDict, zh: zhDict };
const STORAGE_KEY = "hangage-config";

export default function HanbokLanding({ lang = "ko" }) {
  const dict = dictionaries[lang]?.landing || dictionaries["en"].landing;

  const [adminOpen, setAdminOpen] = useState(false);
  const [config, setConfig] = useState({
    brandName: "한가게",
    metaTitle: dict.hero.headline,
    metaDescription: dict.hero.subtext,
    heroHeadline: dict.hero.headline,
    address: dict.store.address,
    hours: "영업시간 오전9시~오후7시",
    phoneMain: "063-255-2547",
    phoneMobile: "010-7309-2547",
    instagram: "@efun36",
    naverPlaceUrl: "https://naver.me/GA8LhINb",
    kakaoOpenChatUrl: "https://open.kakao.com/o/s9HWYCOh",
    smartstoreUrl: "https://smartstore.naver.com/hangagye",
    policyText: dict.hero.benefit3,
    categories: [
      { title: dict.categories.title, desc: dict.categories.subtitle, img: "/maleB002.png" },
      { title: "여성 생활한복", desc: "모던·미니멀 실루엣", img: "/hanW001.png" },
      { title: "어린이 한복", desc: "귀여운 우리옷", img: "/childP001.png" }
    ],
    bests: [
      { name: "모던한복", price: "문의 가능", img: "/twoP001.png" },
      { name: "철릭원피스", price: "문의 가능", img: "/oneB002.png" }
    ],
  });

  // localStorage 불러오기
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    alert("저장했어요. (이 브라우저에만 저장)");
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig({
      ...config,
      metaTitle: dict.hero.headline,
      metaDescription: dict.hero.subtext,
      heroHeadline: dict.hero.headline,
    });
  };

  const exportToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      alert("설정을 복사했어요. 붙여넣어 보내주시면 코드에 반영해드릴게요!");
    } catch {
      alert("복사 실패. 수동 복사해주세요.");
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
            <span className="font-semibold tracking-tight">{config.brandName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#categories">{dict.categories.title}</a>
            <a href="#best">{dict.best.title}</a>
            <a href="#story">{dict.story.title}</a>
            <a href="#size">{dict.size.title}</a>
            <a href="#store">{dict.store.title}</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setAdminOpen((v) => !v)}
            >
              <Settings className="w-4 h-4 mr-1" /> 관리자
            </Button>
            <a href={config.smartstoreUrl} target="_blank" rel="noopener" className="bg-blue-900 text-white px-4 py-2 rounded-2xl">
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
            <h1 className="text-3xl md:text-5xl font-bold">{dict.hero.headline}</h1>
            <p className="mt-4 text-gray-700">{dict.hero.subtext}</p>
            <div className="mt-6 flex gap-3">
              <Link href={`/${lang}/products`}>
                <Button className="bg-blue-900 text-white rounded-2xl">
                  {dict.hero.ctaProducts}
                </Button>
              </Link>
              <Link href={`/${lang}/lookbook`}>
                <Button variant="outline" className="border-blue-900 text-blue-900 rounded-2xl">
                  {dict.hero.ctaLookbook}
                </Button>
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <li><Check className="w-4 h-4 inline" /> {dict.hero.benefit1}</li>
              <li><Check className="w-4 h-4 inline" /> {dict.hero.benefit2}</li>
              <li><Check className="w-4 h-4 inline" /> {dict.hero.benefit3}</li>
              <li><Check className="w-4 h-4 inline" /> {dict.hero.benefit4}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold">{dict.categories.title}</h2>
        <p className="text-gray-600">{dict.categories.subtitle}</p>
      </section>

      {/* 베스트 상품 */}
      <section id="best" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold">{dict.best.title}</h2>
          <p className="text-gray-600">{dict.best.subtitle}</p>
        </div>
      </section>

      {/* 브랜드 스토리 */}
      <section id="story" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold">{dict.story.title}</h2>
        <p className="mt-4 text-gray-700">{dict.story.text}</p>
      </section>

      {/* 사이즈 */}
      <section id="size" className="bg-gray-50 px-4 py-16">
        <h2 className="text-2xl font-bold">{dict.size.title}</h2>
      </section>

      {/* 리뷰 */}
      <section className="px-4 py-16">
        <h2 className="text-2xl font-bold">{dict.reviews.title}</h2>
      </section>

      {/* 매장 안내 */}
      <section id="store" className="bg-gray-50 px-4 py-16">
        <h2 className="text-2xl font-bold">{dict.store.title}</h2>
        <p className="mt-3">{dict.store.address}</p>
      </section>

      {/* 뉴스레터 */}
      <section className="px-4 py-16">
        <Card>
          <CardContent>
            <h3 className="text-xl font-bold">{dict.newsletter.title}</h3>
            <p>{dict.newsletter.subtitle}</p>
            <form className="mt-3 flex gap-2">
              <Input placeholder={dict.newsletter.placeholder} />
              <Button className="bg-blue-900 text-white">{dict.newsletter.button}</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* 푸터 */}
      <footer className="border-t px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold">{config.brandName}</div>
          </div>
          <div>
            <div className="font-semibold">{dict.footer.customer}</div>
            <ul>
              <li>{dict.footer.links.shipping}</li>
              <li>{dict.footer.links.privacy}</li>
              <li>{dict.footer.links.terms}</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">{dict.footer.quick}</div>
            <ul>
              <li><a href="#categories">{dict.categories.title}</a></li>
              <li><a href="#best">{dict.best.title}</a></li>
              <li><a href="#store">{dict.store.title}</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* 관리자 패널 */}
      {adminOpen && (
        <div className="fixed bottom-4 right-4 bg-white border shadow-xl rounded-2xl p-4">
          <div className="flex justify-between">
            <div className="font-semibold">간편 편집</div>
            <Button variant="ghost" onClick={() => setAdminOpen(false)}>닫기</Button>
          </div>
          <Button onClick={save} className="bg-blue-900 text-white mt-2">저장</Button>
          <Button onClick={reset} variant="outline" className="mt-2">기본값</Button>
          <Button onClick={exportToClipboard} variant="outline" className="mt-2">내보내기</Button>
        </div>
      )}
    </div>
  );
}
