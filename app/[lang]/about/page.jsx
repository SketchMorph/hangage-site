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

  const images = ["/brand1.jpg", "/brand2.jpg", "/brand3.jpg", "/brand4.jpg"];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-snug tracking-tight text-gray-800">
          {t.title}
        </h1>
      </section>

      {/* Brand Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-32">
        {t.story.map((paragraph, idx) => {
          const image = images[idx % images.length];

          // 1️⃣ 인용구 블록 (첫 문단)
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

          // 2️⃣ 시네마틱 와이드컷 (두 번째 이미지)
          if (idx === 1) {
            return (
              <div key={idx} className="w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={image}
                  alt={`Brand Story ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          }

          // 3️⃣ 컬러 블록 (세 번째 문단 강조)
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

          // 4️⃣ 기본 텍스트 + 이미지 교차 (그 외)
          return (
            <div
              key={idx}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* 텍스트 */}
              <div>
                <p className="font-sans text-lg md:text-xl font-light leading-relaxed">
                  {paragraph}
                </p>
              </div>

              {/* 이미지 */}
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
    </main>
  );
}
