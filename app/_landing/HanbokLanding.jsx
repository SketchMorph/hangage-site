"use client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

// ✅ 메인 9개 카테고리 (slug + 대표 이미지 고정)
const MAIN_CATEGORIES = [
  { slug: "new", title: "신상품", img: "/danP001.png" },
  { slug: "men", title: "남성 생활한복", img: "/maleB002.png" },
  { slug: "women", title: "여성 생활한복", img: "/hanW001.png" },
  { slug: "kids", title: "어린이 한복", img: "/childP001.png" },
  { slug: "cheolik", title: "철릭원피스", img: "/oneW001.png" },
  { slug: "bustier", title: "뷔스티에", img: "/strapB001.png" },
  { slug: "skirt", title: "허리치마", img: "/skirtB001.png" },
  { slug: "apron", title: "앞치마", img: "/apronB001.png" },
  { slug: "accessories", title: "두건 및 악세사리", img: "/hairP001.png" },
];

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
  const [bests, setBests] = useState([]);

  // ✅ Supabase에서 베스트 상품만 가져오기
  useEffect(() => {
    async function loadData() {
      const { data: products, error } = await supabase
        .from("product")
        .select("id, name_ko, name_en, name_fr, name_ja, name_zh, price, images")
        .eq("is_active", true);

      if (error) {
        console.error(error);
        return;
      }

      if (products) {
        setBests(products.slice(0, 3)); // 상위 3개만
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

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-[url('/main000.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {dict.hero?.headline}
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-700">
              {dict.hero?.subtext}
            </p>
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
          </div>
        </div>
      </section>

      {/* 카테고리 (slug 방식) */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">{dict.categories?.title}</h2>
        <p className="text-gray-600 mt-2">{dict.categories?.subtitle}</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {MAIN_CATEGORIES.map((c, i) => (
            <Link key={i} href={`/${lang}/lookbook/${c.slug}`} className="group">
              <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="mt-3">
                <div className="font-semibold">{c.title}</div>
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
                      <div className="font-semibold">
                        {b[`name_${lang}`] || b.name_ko}
                      </div>
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
    </div>
  );
}
