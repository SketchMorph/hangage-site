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
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// ✅ 다국어 JSON import
import enDict from "@/locales/en.json";
import koDict from "@/locales/ko.json";
import frDict from "@/locales/fr.json";
import jaDict from "@/locales/ja.json";
import zhDict from "@/locales/zh.json";

const dictionaries = { en: enDict, ko: koDict, fr: frDict, ja: jaDict, zh: zhDict };
const STORAGE_KEY = "hangage-config";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function HanbokLanding({ lang = "ko" }) {
  // ✅ 안전한 fallback 처리
  const baseDict = dictionaries["ko"].landing;
  const dict = { ...baseDict, ...(dictionaries[lang]?.landing || {}) };

  const DEFAULT_CONFIG = {
    brandName: "한가게",
    metaTitle: dict.hero?.headline || "한가게",
    metaDescription: dict.hero?.subtext || "생활한복 전문점",
    heroHeadline: dict.hero?.headline || "한가게",
    address: dict.store?.address || "전주 매장",
    hours: "영업시간 오전9시~오후7시",
    phoneMain: "063-255-2547",
    phoneMobile: "010-7309-2547",
    instagram: "@efun36",
    naverPlaceUrl: "https://naver.me/GA8LhINb",
    kakaoOpenChatUrl: "https://open.kakao.com/o/s9HWYCOh",
    smartstoreUrl: "https://smartstore.naver.com/hangagye",
    policyText: dict.hero?.benefit3 || "",
  };

  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [categories, setCategories] = useState([]);
  const [bests, setBests] = useState([]);

  // ✅ Supabase에서 상품 데이터 불러오기
  useEffect(() => {
    async function loadData() {
      const { data: products, error } = await supabase
        .from("product")
        .select(
          "id, category, name_ko, name_en, name_fr, name_ja, name_zh, price, images"
        )
        .eq("is_active", true);

      if (error) {
        console.error(error);
        return;
      }

      if (products) {
        const grouped = {};
        products.forEach((p) => {
          if (!grouped[p.category]) {
            grouped[p.category] = {
              title: p.category,
              desc: dict.categories?.subtitle || "",
              img: p.images?.[0] || "/no-image.png",
            };
          }
        });
        setCategories(Object.values(grouped));
        setBests(products.slice(0, 3)); // 베스트 상품 3개만 임시 표시
      }
    }
    loadData();
  }, [lang]);

  // ✅ localStorage 불러오기
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(raw) });
    } catch {}
  }, []);

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
            <a href="#categories">{dict.categories?.title}</a>
            <a href="#best">{dict.best?.title}</a>
            <a href="#story">{dict.story?.title}</a>
            <a href="#size">{dict.size?.title}</a>
            <a href="#store">{dict.store?.title}</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => alert("관리자 모드 준비중")}>
              <Settings className="w-4 h-4 mr-1" /> 관리자
            </Button>
            <a
              href={config.smartstoreUrl}
              target="_blank"
              rel="noopener"
              className="bg-blue-900 text-white px-4 py-2 rounded-2xl"
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
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{dict.hero?.headline}</h1>
            <p className="mt-4 text-base md:text-lg text-gray-700">{dict.hero?.subtext}</p>
            <div className="mt-6 flex gap-3">
              <Link href={`/${lang}/products`}>
                <Button size="lg" className="rounded-2xl bg-blue-900 hover:bg-blue-800">
                  {dict.hero?.ctaProducts}
                </Button>
              </Link>
              <Link href={`/${lang}/lookbook`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  {dict.hero?.ctaLookbook}
                </Button>
              </Link>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>{dict.hero?.benefit1}</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>{dict.hero?.benefit2}</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>{dict.hero?.benefit3}</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>{dict.hero?.benefit4}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">{dict.categories?.title}</h2>
        <p className="text-gray-600 mt-2">{dict.categories?.subtitle}</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {categories.map((c, i) => (
            <Link key={i} href={`/${lang}/products?cat=${c.title}`} className="group">
              <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="mt-3">
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-gray-600">{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 베스트 상품 */}
      <section id="best" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">{dict.best?.title}</h2>
          <p className="text-gray-600 mt-2">{dict.best?.subtitle}</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {bests.map((b) => (
              <Card key={b.id} className="rounded-2xl overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={b.images?.[0]}
                    alt={b[`name_${lang}`] || b.name_ko}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold">{b[`name_${lang}`] || b.name_ko}</div>
                      <div className="text-sm text-gray-600">시즌 베스트</div>
                    </div>
                    <div className="font-semibold">
                      {b.price ? `${b.price.toLocaleString()} 원` : "문의 가능"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 */}
      <section id="story" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">{dict.story?.title}</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">{dict.story?.text}</p>
      </section>

      {/* 사이즈 & 맞춤 */}
      <section id="size" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">{dict.size?.title}</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card className="rounded-2xl">
              <CardHeader><CardTitle>{dict.size?.guide}</CardTitle></CardHeader>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader><CardTitle>{dict.size?.custom}</CardTitle></CardHeader>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader><CardTitle>{dict.size?.policy}</CardTitle></CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* 매장 안내 */}
      <section id="store" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">{dict.store?.title}</h2>
          <p className="mt-3 text-gray-700">{dict.store?.address}</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4"/> {config.phoneMain} / {config.phoneMobile}</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {config.hours}</div>
            <div className="flex items-center gap-2"><Instagram className="w-4 h-4"/> {config.instagram}</div>
          </div>
        </div>
      </section>

      {/* 뉴스레터 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold">{dict.newsletter?.title}</h3>
            <p className="mt-2 text-sm text-gray-700">{dict.newsletter?.subtitle}</p>
            <form className="flex gap-2 mt-4">
              <Input type="email" placeholder={dict.newsletter?.placeholder}/>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white rounded-2xl">
                {dict.newsletter?.button}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* 푸터 */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <div className="font-semibold">{config.brandName}</div>
          </div>
          <div>
            <div className="font-semibold">{dict.footer?.customer}</div>
            <ul className="mt-2 space-y-1">
              <li>{dict.footer?.links?.shipping}</li>
              <li>{dict.footer?.links?.privacy}</li>
              <li>{dict.footer?.links?.terms}</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">{dict.footer?.quick}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
