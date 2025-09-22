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

  // 각 단락별 대응 이미지
  const images = ["/brand1.jpg", "/brand2.jpg", "/brand3.jpg", "/brand4.jpg"];

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800">
          {t.title}
        </h1>
      </section>

      {/* Brand Story */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {t.story.map((paragraph, idx) => (
          <div
            key={idx}
            className={`grid md:grid-cols-2 gap-10 items-center ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text */}
            <div>
              <p className="text-xl text-gray-700 leading-relaxed tracking-wide">
                {paragraph}
              </p>
            </div>

            {/* Image */}
            {images[idx] && (
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-105">
                <img
                  src={images[idx]}
                  alt={`Brand Story ${idx + 1}`}
                  className="w-full h-full object-cover brightness-105 contrast-95"
                />
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
