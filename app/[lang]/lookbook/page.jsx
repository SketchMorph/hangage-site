"use client";
import Image from "next/image";
import { useMemo } from "react";

// ✅ 앞으로 업로드할 이미지 경로들을 배열로 관리
const LOOKBOOK_IMAGES = [
  "/lookbooks/new/hero.jpg",
  "/lookbooks/men/hero.jpg",
  "/lookbooks/women/hero.jpg",
  "/lookbooks/kids/hero.jpg",
  "/lookbooks/cheolik/hero.jpg",
  "/lookbooks/bustier/hero.jpg",
  "/lookbooks/skirt/hero.jpg",
  "/lookbooks/apron/hero.jpg",
  "/lookbooks/accessories/hero.jpg"
];

export default function LookbookCollagePage() {
  // 새로고침마다 랜덤 순서로 섞기
  const shuffled = useMemo(
    () => [...LOOKBOOK_IMAGES].sort(() => Math.random() - 0.5),
    []
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero 영역 (간단한 타이틀만) */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <img
          src="/main000.png"
          alt="lookbook hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide uppercase">
            Lookbook
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-80">
            A visual collage of our hanbok collections
          </p>
        </div>
      </section>

      {/* Collage 영역 */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {shuffled.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <Image
                src={src}
                alt={`lookbook-${i}`}
                width={800}
                height={1000}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
