"use client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

// ✅ 메인 9개 카테고리
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
  const baseDict = dictionaries["ko"].landing;
  const dict = { ...baseDict, ...(dictionaries[lang]?.landing || {}) };

  const [bests, setBests] = useState([]);

  // ✅ Supabase에서 베스트 상품 가져오기
  useEffect(() => {
    async function loadData() {
      const { data } = await supabase
        .from("product")
        .select("id, name_ko, name_en, name_fr, name_ja, name_zh, price, images")
        .eq("is_active", true);
      if (data) setBests(data.slice(0, 3));
    }
    loadData();
  }, [lang]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Helmet>
        <title>{dict.hero?.headline || "한가게"}</title>
        <meta name="description" content={dict.hero?.subtext || "생활한복 전문점"} />
      </Helmet>

      {/* Hero */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <img
          src="/main000.png"
          alt="hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide">
            {dict.hero?.headline}
          </h1>
          <p className="mt-4 text-lg opacity-90">{dict.hero?.subtext}</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href={`/${lang}/products`}>
              <Button className="bg-blue-900 hover:bg-blue-800 rounded-full px-6 py-3 text-white">
                {dict.hero?.ctaProducts}
              </Button>
            </Link>
            <Link href={`/${lang}/lookbook`}>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20 rounded-full px-6 py-3"
              >
                {dict.hero?.ctaLookbook}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-semibold mb-12">{dict.categories?.title}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {MAIN_CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/${lang}/lookbook/${c.slug}`}>
              <div className="group overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-lg transition">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-60 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-medium group-hover:text-blue-700">
                    {c.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Products */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-semibold mb-12">{dict.best?.title}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {bests.map((b) => (
              <div key={b.id} className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition bg-white">
                <img
                  src={b.images?.[0]}
                  alt={b[`name_${lang}`] || b.name_ko}
                  className="w-full h-72 object-cover object-center"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg">
                    {b[`name_${lang}`] || b.name_ko}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {b.price ? `${b.price.toLocaleString()} 원` : "문의 가능"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">{dict.story?.title}</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          {dict.story?.text}
        </p>
      </section>

      {/* Size Guide */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">{dict.size?.title}</h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="font-semibold">{dict.size?.guide}</h3>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="font-semibold">{dict.size?.custom}</h3>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h3 className="font-semibold">{dict.size?.policy}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Store Info */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-semibold mb-6">{dict.store?.title}</h2>
          <p className="text-lg text-gray-600">{dict.store?.address}</p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <iframe
            src="https://naver.me/GA8LhINb"
            className="w-full h-64"
            allowFullScreen
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">{dict.newsletter?.title}</h2>
          <p className="mb-6 text-blue-100">{dict.newsletter?.subtitle}</p>
          <div className="flex gap-3 justify-center">
            <Input
              type="email"
              placeholder={dict.newsletter?.placeholder}
              className="rounded-full px-4 py-3 text-black w-64"
            />
            <Button className="rounded-full bg-white text-blue-900 px-6 py-3 hover:bg-blue-100">
              {dict.newsletter?.button}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">{dict.footer?.customer}</h3>
            <ul className="space-y-2 text-sm">
              <li>{dict.footer?.links?.shipping}</li>
              <li>{dict.footer?.links?.privacy}</li>
              <li>{dict.footer?.links?.terms}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">{dict.footer?.quick}</h3>
            <ul className="space-y-2 text-sm">
              <li>Instagram</li>
              <li>Naver Smartstore</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-10">
          © {new Date().getFullYear()} Hangage. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
