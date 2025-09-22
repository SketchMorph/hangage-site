"use client";
import React from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import Image from "next/image";
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

  // ✅ 룩북 15개 카드 (이미지는 /public/lookbooks/look1.jpg ~ look15.jpg 로 준비)
  const LOOKBOOK_ITEMS = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    img: `/lookbooks/look${i + 1}.jpg`,
    title: `Look ${i + 1}`
  }));

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
            {/* 상품 버튼 (원하면 제거 가능) */}
            <Link href={`/${lang}/products`}>
              <Button className="bg-blue-900 hover:bg-blue-800 rounded-full px-6 py-3 text-white">
                {dict.hero?.ctaProducts}
              </Button>
            </Link>
            {/* 룩북 버튼 제거 */}
            {/* 문의하기 버튼 */}
            <a href="#contact">
              <Button className="bg-green-600 hover:bg-green-500 rounded-full px-6 py-3 text-white">
                {dict.hero?.ctaContact}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Lookbook */}
      <section id="lookbook" className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-semibold mb-12">{dict.lookbook?.title}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {LOOKBOOK_ITEMS.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">{dict.story?.title}</h2>
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

      {/* Follow Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Follow Us</h2>
          <p className="mb-10 text-gray-600">
            {dict.follow?.subtitle}
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
            <a
              href="https://www.facebook.com/hangagye"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Store Info */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-10"
      >
        <div>
          <h2 className="text-3xl font-semibold mb-6">{dict.store?.title}</h2>
          <p className="text-lg text-gray-600 whitespace-pre-line">
            {dict.store?.address}
          </p>
          <p className="mt-2 text-gray-600">📧 contact@hangage.com</p>
          <p className="mt-1 text-gray-600">📱 010-1234-5678</p>
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
              <li>
                <a
                  href="https://www.facebook.com/hangagye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Facebook
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
