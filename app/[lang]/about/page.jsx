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
          const reversed = idx % 2 === 1;

          return (
            <div
              key={idx}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                reversed ? "md:flex-row-reverse" : ""
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
