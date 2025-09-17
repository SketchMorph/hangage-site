"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ✅ Hero 이미지 매핑
const HERO_IMAGES = {
  new: "/lookbooks/new/hero.jpg",
  men: "/lookbooks/men/hero.jpg",
  women: "/lookbooks/women/hero.jpg",
  kids: "/lookbooks/kids/hero.jpg",
  cheolik: "/lookbooks/cheolik/hero.jpg",
  bustier: "/lookbooks/bustier/hero.jpg",
  skirt: "/lookbooks/skirt/hero.jpg",
  apron: "/lookbooks/apron/hero.jpg",
  accessories: "/lookbooks/accessories/hero.jpg"
};

export default function LookbookPage() {
  const { lang, slug } = useParams();
  const [lookbook, setLookbook] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: lb } = await supabase
        .from("lookbook")
        .select("*")
        .eq("season", slug)
        .eq("is_active", true)
        .single();

      if (lb) setLookbook(lb);

      const { data: items } = await supabase
        .from("lookbook_products")
        .select("product(*)")
        .eq("lookbook_id", lb?.id);

      if (items) setProducts(items.map((i) => i.product));
    }
    loadData();
  }, [slug]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero 영역 */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <img
          src={HERO_IMAGES[slug] || "/placeholder-hero.jpg"}
          alt={`${slug} hero`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide">
            {lookbook?.[`title_${lang}`] || lookbook?.title_ko || slug}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg font-light opacity-90">
            {lookbook?.[`description_${lang}`] ||
              lookbook?.description_ko ||
              `계절과 조화를 이루는 ${slug} 컬렉션을 만나보세요.`}
          </p>
        </div>
      </section>

      {/* 상품 목록 */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center">아직 등록된 상품이 없습니다.</p>
        ) : (
          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={p.images?.[0] || "/placeholder.jpg"}
                  alt={p[`name_${lang}`] || p.name_ko}
                  className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent p-6">
                  <h2 className="text-white text-lg font-medium">
                    {p[`name_${lang}`] || p.name_ko}
                  </h2>
                  <p className="text-gray-200 text-sm mt-1">
                    {p.price ? `${p.price.toLocaleString()} 원` : "문의 가능"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
