"use client";

import React from "react";
import { useParams } from "next/navigation";

// ✅ JSON import
import en from "@/locales/en/about.json";
import ko from "@/locales/ko/about.json";
import ja from "@/locales/ja/about.json";
import zh from "@/locales/zh/about.json";
import fr from "@/locales/fr/about.json";

const dictionaries = { en, ko, ja, zh, fr };

export default function AboutPage() {
  const { lang } = useParams();
  const t = dictionaries[lang] || dictionaries["ko"];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          {t.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-600">{t.intro}</p>
      </section>

      {/* Content Sections */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-20">
        {/* Philosophy */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {t.philosophyTitle}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t.philosophyDesc}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/brand1.jpg"
              alt="Philosophy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Craftsmanship */}
        <div className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <div className="md:order-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t.craftTitle}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t.craftDesc}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg md:order-1">
            <img
              src="/brand2.jpg"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Heritage */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {t.heritageTitle}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t.heritageDesc}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/brand3.jpg"
              alt="Heritage"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vision */}
        <div className="grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <div className="md:order-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t.visionTitle}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t.visionDesc}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg md:order-1">
            <img
              src="/brand4.jpg"
              alt="Vision"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
