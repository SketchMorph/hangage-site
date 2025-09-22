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

  // 사용할 이미지 배열 (시네마틱 와이드컷)
  const images = ["/brand1.jpg", "/brand2.jpg", "/brand3.jpg", "/brand4.jpg"];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="font-serif text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-gray-100 drop-shadow-lg">
          {t.title}
        </h1>
      </section>

      {/* Cinematic Brand Story */}
      <section className="space-y-32">
        {t.story.map((paragraph, idx) => {
          const image = images[idx % images.length];
          const reversed = idx % 2 === 1;

          return (
            <div key={idx} className="relative w-full">
              {/* Background Cinematic Image */}
              <div className="relative w-full aspect-[21/9] overflow-hidden">
                <img
                  src={image}
                  alt={`Brand Story ${idx + 1}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-1000 brightness-90"
                />

                {/* Overlay Text */}
                <div
                  className={`absolute inset-0 flex items-center ${
                    reversed ? "justify-end pr-16" : "justify-start pl-16"
                  }`}
                >
                  <div className="max-w-2xl bg-black/40 p-8 rounded-xl shadow-lg">
                    <p className="font-sans text-lg md:text-2xl font-light leading-relaxed text-gray-100">
                      {paragraph}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
