"use client";
import React from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ 다국어 JSON import
import enDict from "@/locales/en.json";
import koDict from "@/locales/ko.json";
import frDict from "@/locales/fr.json";
import jaDict from "@/locales/ja.json";
import zhDict from "@/locales/zh.json";

const dictionaries = { en: enDict, ko: koDict, fr: frDict, ja: jaDict, zh: zhDict };

// ✅ 메인 9개 카테고리
const MAIN_CATEGORIES = [
  { slug: "new", img: "/danP001.png" },
  { slug: "men", img: "/maleB002.png" },
  { slug: "women", img: "/hanW001.png" },
  { slug: "kids", img: "/childP001.png" },
  { slug: "cheolik", img: "/oneW001.png" },
  { slug: "bustier", img: "/strapB001.png" },
  { slug: "skirt", img: "/skirtB001.png" },
  { slug: "apron", img: "/apronB001.png" },
  { slug: "accessories", img: "/hairP001.png" }
];

export default function HanbokLanding({ lang = "ko" }) {
  const baseDict = dictionaries["ko"].landing;
  const dict = { ...baseDict, ...(dictionaries[lang]?.landing || {}) };

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
                  alt={dict.categories?.items?.[c.slug] || c.slug}
                  className="w-full h-60 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-medium group-hover:text-blue-700">
                    {dict.categories?.items?.[c.slug] || c.slug}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop Links */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">{dict.shop?.title}</h2>
          <p className="mb-10 text-gray-600">{dict.shop?.subtitle}</p>
          <div className="flex justify-center gap-6">
            <Link
              href="https://your-cafe24-link.com"
              target="_blank"
              className="px-6 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-800"
            >
              {dict.shop?.cafe24}
            </Link>
            <Link
              href="https://smartstore.naver.com/yourstore"
              target="_blank"
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-500"
            >
              {dict.shop?.smartstore}
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">{dict.story?.title}</h2>
        <div className="w-full h-64 bg-gray-100 rounded-2xl mb-8 flex items-center justify-center">
          <span className="text-gray-400">[브랜드 스토리 이미지 삽입]</span>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          {dict.story?.text}
        </p>
      </section>

      {/* Size Guide */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">{dict.size?.title}</h2>
          <p className="mb-10 text-gray-600">{dict.size?.guide}</p>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {dict.size?.table?.headers.map((h, i) => (
                    <th key={i} className="border p-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dict.size?.table?.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="border p-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-gray-600">{dict.size?.custom}</p>
          <p className="mt-2 text-gray-500 text-sm">{dict.size?.policy}</p>
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
          {/* 고객 안내 */}
          <div>
            <h3 className="font-semibold mb-3">{dict.footer?.customer}</h3>
            <ul className="space-y-2 text-sm">
              <li>{dict.footer?.links?.shipping}</li>
              <li>{dict.footer?.links?.privacy}</li>
              <li>{dict.footer?.links?.terms}</li>
            </ul>
          </div>

          {/* 바로가기 */}
          <div>
            <h3 className="font-semibold mb-3">{dict.footer?.quick}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/yourbrand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://smartstore.naver.com/yourstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Naver Smartstore
                </a>
              </li>
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
