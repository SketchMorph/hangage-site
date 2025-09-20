"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

// 카테고리 기본 구조 (이미지 + slug)
const MAIN_CATEGORIES = [
  { slug: "new", img: "/danP001.png" },
  { slug: "men", img: "/maleB002.png" },
  { slug: "women", img: "/hanW001.png" },
  { slug: "kids", img: "/childP001.png" },
  { slug: "cheolik", img: "/oneW001.png" },
  { slug: "bustier", img: "/strapB001.png" },
  { slug: "skirt", img: "/skirtB001.png" },
  { slug: "apron", img: "/apronB001.png" },
  { slug: "accessories", img: "/hairP001.png" },
];

// 언어별 카테고리 번역
const CATEGORY_TITLES = {
  ko: {
    new: "신상품",
    men: "남성 생활한복",
    women: "여성 생활한복",
    kids: "어린이 한복",
    cheolik: "철릭원피스",
    bustier: "뷔스티에",
    skirt: "허리치마",
    apron: "앞치마",
    accessories: "두건 및 악세사리",
    title: "카테고리",
  },
  en: {
    new: "New Arrivals",
    men: "Men's Hanbok",
    women: "Women's Hanbok",
    kids: "Kids' Hanbok",
    cheolik: "Cheolik Dress",
    bustier: "Bustier",
    skirt: "Skirt",
    apron: "Apron",
    accessories: "Headwear & Accessories",
    title: "Categories",
  },
  ja: {
    new: "新商品",
    men: "男性韓服",
    women: "女性韓服",
    kids: "子供韓服",
    cheolik: "チョリックワンピース",
    bustier: "ビスチェ",
    skirt: "スカート",
    apron: "エプロン",
    accessories: "アクセサリー",
    title: "カテゴリ",
  },
  zh: {
    new: "新品",
    men: "男士韩服",
    women: "女士韩服",
    kids: "儿童韩服",
    cheolik: "齐褶连衣裙",
    bustier: "束身衣",
    skirt: "裙子",
    apron: "围裙",
    accessories: "头饰及配件",
    title: "类别",
  },
  fr: {
    new: "Nouveautés",
    men: "Hanbok Homme",
    women: "Hanbok Femme",
    kids: "Hanbok Enfant",
    cheolik: "Robe Cheolik",
    bustier: "Bustier",
    skirt: "Jupe",
    apron: "Tablier",
    accessories: "Accessoires",
    title: "Catégories",
  },
};

export default function ProductsPage() {
  const { lang } = useParams();
  const t = CATEGORY_TITLES[lang] || CATEGORY_TITLES["ko"]; // fallback: 한국어

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {MAIN_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/${lang}/lookbook/${c.slug}`}
            className="group"
          >
            <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={c.img}
                alt={t[c.slug]}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold group-hover:text-blue-600">
                  {t[c.slug]}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
