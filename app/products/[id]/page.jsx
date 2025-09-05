"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic"; // ✅ 동적 렌더링

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const { data, error } = await supabase
      .from("product") // ✅ 테이블명 수정
      .select("*")
      .eq("id", params.id)
      .single();
    if (error) console.error(error);
    else setProduct(data);
  }

  if (!product) return <div className="p-6">상품을 찾을 수 없습니다.</div>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{product.name_ko || product.name}</h1>
      <p className="text-xl text-gray-700 mb-4">
        {product.price.toLocaleString()} 원
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {product.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name}-${idx}`}
            className="rounded-xl shadow"
          />
        ))}
      </div>
      <p className="text-gray-600">{product.description_ko || product.description}</p>
    </main>
  );
}
