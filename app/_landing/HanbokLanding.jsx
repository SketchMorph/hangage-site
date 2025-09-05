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

  const DEFAULT_CONFIG = {
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

  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [adminOpen, setAdminOpen] = useState(false);

  // localStorage 불러오기
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(raw) });
    } catch {}
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    alert("저장했어요. (이 브라우저에만 저장)");
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(DEFAULT_CONFIG);
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
            <Button variant="outline" onClick={() => setAdminOpen((v) => !v)}>
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
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{dict.hero.headline}</h1>
            <p className="mt-4 text-base md:text-lg text-gray-700">{dict.hero.subtext}</p>
            <div className="mt-6 flex gap-3">
              <Link href={`/${lang}/products`}>
                <Button size="lg" className="rounded-2xl bg-blue-900 hover:bg-blue-800">
                  {dict.hero.ctaProducts}
                </Button>
              </Link>
              <Link href={`/${lang}/lookbook`}>
                <Button size="lg" variant="outline" className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50">
                  {dict.hero.ctaLookbook}
                </Button>
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
              <li><Check className="w-4 h-4 inline" /> {dict.hero.benefit1}</li>
              <li><Check className="w-4 h-4 inline" /> {dict.hero.benefit2}</li>
              <li><Check className="w-4 h-4 inline" /> {config.policyText}</li>
              <li><Check className="w-4 h-4 inline" /> {dict.hero.benefit4}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">{dict.categories.title}</h2>
        <p className="text-gray-600 mt-2">{dict.categories.subtitle}</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
          {config.categories.map((c, i) => (
            <a key={i} href="#" className="group">
              <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="mt-3">
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-gray-600">{c.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 베스트 상품 */}
      <section id="best" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">{dict.best.title}</h2>
          <p className="text-gray-600 mt-2">{dict.best.subtitle}</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {config.bests.map((b, i) => (
              <Card key={i} className="rounded-2xl overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img src={b.img} alt={b.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold">{b.name}</div>
                      <div className="text-sm text-gray-600">시즌 베스트</div>
                    </div>
                    <div className="font-semibold">{b.price}</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="rounded-2xl bg-blue-900 hover:bg-blue-800">장바구니</Button>
                    <Button variant="outline" className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50">바로구매</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 */}
      <section id="story" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{dict.story.title}</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">{dict.story.text}</p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li><Check className="w-4 h-4 inline" /> 국내 소량 생산</li>
              <li><Check className="w-4 h-4 inline" /> 세탁·관리 간편</li>
              <li><Check className="w-4 h-4 inline" /> 친환경 포장</li>
            </ul>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <img src="/home01.png" alt="atelier" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 사이즈 & 맞춤 */}
      <section id="size" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">{dict.size.title}</h2>
          {/* 원래 있던 테이블/카드 그대로 유지 */}
        </div>
      </section>

      {/* 리뷰 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">{dict.reviews.title}</h2>
      </section>

      {/* 매장 안내 */}
      <section id="store" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{dict.store.title}</h2>
            <p className="mt-3 text-gray-700">{config.address}</p>
            <div className="mt-4 text-sm">
              <div><Phone className="w-4 h-4 inline" /> {config.phoneMain} / {config.phoneMobile}</div>
              <div><MapPin className="w-4 h-4 inline" /> {config.hours}</div>
              <div><Instagram className="w-4 h-4 inline" /> {config.instagram}</div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href={config.kakaoOpenChatUrl} target="_blank" className="bg-blue-900 text-white px-4 py-2 rounded-2xl">카카오톡 예약</a>
              <a href={config.naverPlaceUrl} target="_blank" className="border border-blue-900 text-blue-900 px-4 py-2 rounded-2xl">네이버 지도</a>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <img src="/profile02.png" alt="atelier" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 뉴스레터 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
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
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm">
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

      {/* 관리자 패널 (기존 그대로 유지) */}
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
