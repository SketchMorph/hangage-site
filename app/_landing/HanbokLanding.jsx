"use client";
import React from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Check,
  ShoppingBag,
  Settings,
  Save,
  RefreshCcw,
  Copy,
  Phone,
  MapPin,
  Instagram,
  Truck,
} from "lucide-react";

// 다국어 JSON import
import enDict from "@/locales/en.json";
import koDict from "@/locales/ko.json";
import frDict from "@/locales/fr.json";
import jaDict from "@/locales/ja.json";
import zhDict from "@/locales/zh.json";

const dictionaries = { en: enDict, ko: koDict, fr: frDict, ja: jaDict, zh: zhDict };

export default function HanbokLanding({ lang = "en" }) {
  const dict = dictionaries[lang]?.landing || dictionaries["en"].landing;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Helmet>
        <title>{dict.hero.headline}</title>
        <meta name="description" content={dict.hero.subtext} />
      </Helmet>

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
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>{dict.hero.benefit1}</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>{dict.hero.benefit2}</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>{dict.hero.benefit3}</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4"/>{dict.hero.benefit4}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">{dict.categories.title}</h2>
        <p className="text-gray-600 mt-2">{dict.categories.subtitle}</p>
      </section>

      {/* 베스트 상품 */}
      <section id="best" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">{dict.best.title}</h2>
          <p className="text-gray-600 mt-2">{dict.best.subtitle}</p>
        </div>
      </section>

      {/* 브랜드 스토리 */}
      <section id="story" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">{dict.story.title}</h2>
        <p className="mt-4 text-gray-700">{dict.story.text}</p>
      </section>

      {/* 사이즈 & 맞춤 */}
      <section id="size" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">{dict.size.title}</h2>
        </div>
      </section>

      {/* 리뷰 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">{dict.reviews.title}</h2>
      </section>

      {/* 매장 안내 */}
      <section id="store" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">{dict.store.title}</h2>
          <p className="mt-3 text-gray-700">{dict.store.address}</p>
        </div>
      </section>

      {/* 뉴스레터 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold">{dict.newsletter.title}</h3>
            <p className="mt-2 text-sm text-gray-700">{dict.newsletter.subtitle}</p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder={dict.newsletter.placeholder} className="rounded-2xl"/>
              <Button type="submit" className="rounded-2xl bg-blue-900 hover:bg-blue-800">{dict.newsletter.button}</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* 푸터 */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold text-gray-800">{dict.footer.customer}</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#">{dict.footer.links.shipping}</a></li>
              <li><a href="#">{dict.footer.links.privacy}</a></li>
              <li><a href="#">{dict.footer.links.terms}</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-800">{dict.footer.quick}</div>
            <ul className="mt-2 space-y-1">
              <li><a href="#categories">{dict.categories.title}</a></li>
              <li><a href="#best">{dict.best.title}</a></li>
              <li><a href="#store">{dict.store.title}</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
