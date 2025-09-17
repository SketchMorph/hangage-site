"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

// 메인 9개 카테고리 (HanbokLanding.jsx와 동일하게 유지)
const MAIN_CATEGORIES = [
  { slug: "new", title: "신상품", img: "/danP001.png" },
  { slug: "men", title: "남성 생활한복", img: "/maleB002.png" },
  { slug: "women", title: "여성 생활한복", img: "/hanW001.png" },
  { slug: "kids", title: "어린이 한복", img: "/childP001.png" },
  { slug: "cheolik", title: "철릭원피스", img: "/oneW001.png" },
  { slug: "bustier", title: "뷔스티에", img: "/strapB001.png" },
  { slug: "skirt", title: "허리치마", img: "/skirtB001.png" },
  { slug: "apron", title: "앞치마", img: "/apronB001.png" },
  { slug: "accessories", title: "두건 및 악세사리", img: "/hairP001.png" },
];

export default function ProductsPage() {
  const { lang } = useParams();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">카테고리</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {MAIN_CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/${lang}/lookbook/${c.slug}`} className="group">
            <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold group-hover:text-blue-600">
                  {c.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
