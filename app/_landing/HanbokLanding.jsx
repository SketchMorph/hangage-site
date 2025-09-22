"use client";
import React from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import Image from "next/image";   // ✅ 이미지 최적화용
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ 다국어 JSON import
import enDict from "@/locales/en.json";
import koDict from "@/locales/ko.json";
import frDict from "@/locales/fr.json";
import jaDict from "@/locales/ja.json";
import zhDict from "@/locales/zh.json";

const dictionaries = { en: enDict, ko: koDict, fr: frDict, ja: jaDict, zh: zhDict };

export default function HanbokLanding({ lang = "ko" }) {
  const baseDict = dictionaries["ko"].landing;
  const dict = { ...baseDict, ...(dictionaries[lang]?.landing || {}) };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Helmet>
        <title>{dict.hero?.headline || "한가게"}</title>
        <meta
          name="description"
          content={dict.hero?.subtext || "생활한복 전문점"}
        />
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
            {/* ✅ 룩북으로 스크롤 이동 */}
            <a href="#lookbook">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20 rounded-full px-6 py-3"
              >
                {dict.hero?.ctaLookbook}
              </Button>
            </a>
            {/* ✅ 문의하기 버튼 → contact 섹션 이동 */}
            <a href="#contact">
              <Button className="bg-green-600 hover:bg-green-500 rounded-full px-6 py-3 text-white">
                문의하기
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Lookbook (카테고리 대신) */}
      <section id="lookbook" className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-semibold mb-12">{dict.lookbook?.title || "Lookbook"}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <img src="/lookbooks/women/hero.jpg" alt="Women" className="w-full h-72 object-cover" />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <img src="/lookbooks/men/hero.jpg" alt="Men" className="w-full h-72 object-cover" />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <img src="/lookbooks/kids/hero.jpg" alt="Kids" className="w-full h-72 object-cover" />
          </div>
        </div>
      </section>

      {/* Brand Story (원페이지 구성) */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">{dict.story?.title || "Brand Story"}</h2>
        <div className="w-full h-64 relative mb-8 rounded-2xl overflow-hidden shadow-sm">
          <Image
            src="/story01.jpg"
            alt="Brand Story"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          {dict.story?.text}
        </p>
      </section>

      {/* SNS Links */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Follow Us</h2>
          <p className="mb-10 text-gray-600">
            한가게의 새로운 소식과 스타일을 SNS에서 만나보세요.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://blog.naver.com/hangagye"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              Blog
            </a>
            <a
              href="https://www.instagram.com/hangagye_official"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Store Info (문의 대상 섹션) */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-10"
      >
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
                  href="https://www.instagram.com/hangagye_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://blog.naver.com/hangagye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Blog
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
