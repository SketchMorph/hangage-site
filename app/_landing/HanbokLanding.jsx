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

export default function HanbokLanding({ lang = "ko" }) {
  const baseDict = dictionaries["ko"];
  const dict = { ...baseDict, ...(dictionaries[lang] || {}) };

  // ✅ 룩북 15개 카드
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
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {/* 상품 보기 */}
            <Link href={`/${lang}/products`}>
              <Button className="bg-blue-900 hover:bg-blue-800 rounded-full px-6 py-3 text-white">
                {dict.hero?.ctaProducts}
              </Button>
            </Link>

            {/* 스마트스토어 */}
            <a
              href="https://smartstore.naver.com/hangagye"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-500 rounded-full px-6 py-3 text-white">
                {dict.hero?.ctaSmartstore}
              </Button>
            </a>

            {/* 자사몰 */}
            <a
              href="https://alban915.cafe24.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-purple-700 hover:bg-purple-600 rounded-full px-6 py-3 text-white">
                {dict.hero?.ctaCafe24}
              </Button>
            </a>

            {/* 문의하기 */}
            <a href="#contact">
              <Button className="bg-yellow-600 hover:bg-yellow-500 rounded-full px-6 py-3 text-white">
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
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        <h2 className="font-serif text-4xl md:text-5xl text-center font-semibold text-gray-900 mb-12">
          {dict.story?.title}
        </h2>

        {dict.story?.story?.map((paragraph, idx) => {
          const images = ["/brand1.jpg", "/brand2.jpg", "/brand3.jpg", "/brand4.jpg"];
          const image = images[idx % images.length];

          if (idx === 0) {
            return (
              <blockquote
                key={idx}
                className="font-serif italic text-2xl md:text-3xl text-sky-600 text-center py-12"
              >
                “{paragraph}”
              </blockquote>
            );
          }

          if (idx === 1) {
            return (
              <div
                key={idx}
                className="w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-xl"
              >
                <img
                  src={image}
                  alt={`Brand Story ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          }

          if (idx === 2) {
            return (
              <section
                key={idx}
                className="bg-sky-50 py-20 px-6 text-center rounded-2xl shadow-inner"
              >
                <p className="font-sans text-xl md:text-2xl leading-relaxed text-gray-800 max-w-3xl mx-auto">
                  {paragraph}
                </p>
              </section>
            );
          }

          return (
            <div
              key={idx}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div>
                <p className="font-sans text-lg md:text-xl font-light leading-relaxed">
                  {paragraph}
                </p>
              </div>
              {image && (
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={`Brand Story ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Follow Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Follow Us</h2>
          <p className="mb-10 text-gray-600">{dict.follow?.subtitle}</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href={dict.follow?.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700"
            >
              Blog
            </a>
            <a
              href={dict.follow?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            >
              Instagram
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
          <p className="mt-2 text-gray-600">📧 {dict.store?.email}</p>
          <p className="mt-1 text-gray-600">📱 {dict.store?.phone}</p>
          <p className="mt-1 text-gray-600">☎ {dict.store?.storePhone}</p>
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
                  href={dict.follow?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={dict.follow?.blog}
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

-
