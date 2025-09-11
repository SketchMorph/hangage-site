"use client";
import Link from "next/link";
import { useMemo } from "react";
import koDict from "@/locales/ko.json";
import enDict from "@/locales/en.json";
import jaDict from "@/locales/ja.json";
import frDict from "@/locales/fr.json";
import zhDict from "@/locales/zh.json";

const dictionaries = { ko: koDict, en: enDict, ja: jaDict, fr: frDict, zh: zhDict };

const CATEGORY_IMAGES = {
  "신상품": "/danP001.png",
  "남성 생활한복": "/maleB002.png",
  "여성 생활한복": "/hanW001.png",
  "어린이 한복": "/childP001.png",
  "철릭원피스": "/oneW001.png",
  "뷔스티에": "/strapB001.png",
  "허리치마": "/skirtB001.png",
  "앞치마": "/apronB001.png",
  "두건 및 악세사리": "/hairP001.png"
};

export default function HanbokLanding({ lang = "ko" }) {
  const dict = useMemo(() => dictionaries[lang] || dictionaries["ko"], [lang]);
  const categories = dict.landing.categories;

  return (
    <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold">카테고리</h2>
      <p className="text-gray-600 mt-2">원하시는 스타일을 골라보세요.</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
        {Object.entries(categories).map(([key, value]) => (
          <Link key={key} href={`/${lang}/products?cat=${key}`} className="group block">
            <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={CATEGORY_IMAGES[key]}
                alt={value.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="mt-3">
              <div className="font-semibold">{value.title}</div>
              <div className="text-sm text-gray-600">{value.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
