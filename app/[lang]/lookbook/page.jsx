"use client";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ✅ 메인 카테고리
const MAIN_CATEGORIES = [
  { slug: "new", title: "신상품", img: "/danP001.png" },
  { slug: "men", title: "남성 한복", img: "/maleB002.png" },
  { slug: "women", title: "여성 한복", img: "/hanW001.png" },
  { slug: "kids", title: "어린이 한복", img: "/childP001.png" },
  { slug: "cheolik", title: "철릭 원피스", img: "/oneW001.png" },
  { slug: "bustier", title: "뷔스티에", img: "/strapB001.png" },
  { slug: "skirt", title: "허리치마", img: "/skirtB001.png" },
  { slug: "apron", title: "앞치마", img: "/apronB001.png" },
  { slug: "accessories", title: "두건 & 액세서리", img: "/hairP001.png" }
];

export default function LookbookList() {
  const { lang } = useParams();
  const params = useSearchParams();
  const category = params.get("cat");

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      if (!category) return;
      const { data, error } = await supabase
        .from("lookbook")
        .select("*")
        .eq("category", category)
        .eq("is_active", true);

      if (!error) setItems(data || []);
    }
    load();
  }, [category]);

  // ✅ 1) 기본 페이지 (카테고리 전체 보기)
  if (!category) {
    return (
      <div className="bg-white min-h-screen">
        {/* Hero */}
        <section className="relative w-full h-[60vh] overflow-hidden">
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
            <p className="mt-4 text-lg md:text-xl max-w-2xl opacity-90">
              Discover all our categories and seasonal collections in one place.
            </p>
          </div>
        </section>

        {/* Category Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Explore Categories
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {MAIN_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/${lang}/lookbook?cat=${c.slug}`}
                className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                  <h3 className="text-white text-lg font-medium p-4">
                    {c.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ✅ 2) 카테고리 선택 시 (Supabase 데이터 불러오기)
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-2xl md:text-3xl font-bold">{category}</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {items.map((item) => (
          <Link key={item.id} href={`/${lang}/lookbook/${item.id}`}>
            <Card className="rounded-2xl overflow-hidden">
              <div className="aspect-[3/2] bg-gray-100">
                <img
                  src={item.images?.[0] || "/no-image.png"}
                  alt={item[`title_${lang}`] || item.title_ko}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="font-semibold">
                  {item[`title_${lang}`] || item.title_ko}
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {item[`description_${lang}`] || item.description_ko}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
