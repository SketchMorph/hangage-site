"use client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Check,
  Phone,
  MapPin,
  ShoppingBag,
  Instagram,
  Settings,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// 다국어 JSON import
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
  const dict = dictionaries[lang]?.landing || dictionaries["ko"].landing;

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
  };

  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [categories, setCategories] = useState([]);
  const [bests, setBests] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);

  // Supabase 불러오기
  useEffect(() => {
    async function loadData() {
      const { data: products, error } = await supabase
        .from("product")
        .select("id, category, name_ko, name_en, name_fr, name_ja, name_zh, price, images")
        .eq("is_active", true);

      if (error) {
        console.error(error);
        return;
      }

      if (products) {
        // 카테고리별 그룹
        const grouped = {};
        products.forEach((p) => {
          if (!grouped[p.category]) {
            grouped[p.category] = {
              title: p.category,
              desc: dict.categories.subtitle,
              img: p.images?.[0] || "/no-image.png",
            };
          }
        });
        setCategories(Object.values(grouped));

        // 베스트 상품 (임시: 상위 3개)
        setBests(products.slice(0, 3));
      }
    }
    loadData();
  }, [lang]);

  // localStorage 불러오기
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
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{dict.hero.headline}</h1>
            <p className="mt-4 text-base md:text-lg text-gray-700">{dict.hero.subtext}</p>
            <div className="mt-6 flex gap-3">
              <Link href={`/${lang}/products`}>
                <Button size="lg" className="rounded-2xl bg-blue-900 hover:bg-blue-800">
                  {dict.hero.ctaProducts}
                </Button>
              </Link>
              <Link href={`/${lang}/lookbook`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-blue-900 text-blue-900 hover:bg-blue-50"
                >
                  {dict.hero.ctaLookbook}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">{dict.categories.title}</h2>
        <p className="text-gray-600 mt-2">{dict.categories.subtitle}</p>
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
          <h2 className="text-2xl md:text-3xl font-bold">{dict.best.title}</h2>
          <p className="text-gray-600 mt-2">{dict.best.subtitle}</p>
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

      {/* 나머지 story, size, store, newsletter, footer 등은 기존 코드 그대로 유지 */}
    </div>
  );
}
