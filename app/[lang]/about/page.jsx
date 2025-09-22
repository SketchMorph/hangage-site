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
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-b from-sky-100 via-white to-sky-50">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-800 drop-shadow-sm">
          {t.title}
        </h1>
      </section>

      {/* Brand Story with bold layout */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        {t.story.map((paragraph, idx) => {
          const image = images[idx % images.length];
          const reversed = idx % 2 === 1;

          return (
            <div
              key={idx}
              className={`relative grid md:grid-cols-12 gap-10 items-center ${
                reversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image (넓게 배치) */}
              <div
                className={`col-span-7 ${
                  reversed ? "md:col-start-6" : ""
                } relative overflow-hidden rounded-3xl shadow-2xl`}
              >
                <img
                  src={image}
                  alt={`Brand Story ${idx + 1}`}
                  className="w-full h-[500px] object-cover transform hover:scale-105 transition duration-700"
                />
              </div>

              {/* Text with accent bar */}
              <div
                className={`col-span-5 ${
                  reversed ? "md:col-start-1" : ""
                } flex flex-col justify-center`}
              >
                <div className="flex items-start">
                  <div className="w-1 h-24 bg-gradient-to-b from-sky-400 to-indigo-600 rounded-full mr-6"></div>
                  <p className="text-2xl text-gray-800 leading-relaxed tracking-wide">
                    {paragraph}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
