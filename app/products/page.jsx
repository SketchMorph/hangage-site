"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const dynamic = "force-dynamic"; // ✅ 항상 동적으로 렌더링

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase.from("product").select("*"); // ✅ 테이블명 수정
    if (error) console.error(error);
    else setProducts(data || []);
  }

  if (products.length === 0) {
    return <p className="p-6">등록된 상품이 없습니다.</p>;
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">전체 상품</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`} // ✅ 경로도 단수
            className="rounded-xl shadow p-4 block"
          >
            <img
              src={p.images?.[0] || "/no-image.png"}
              alt={p.name_ko || p.name}
              className="rounded-lg mb-2"
            />
            <h3 className="font-semibold">{p.name_ko || p.name}</h3>
            <p>{p.price.toLocaleString()} 원</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
