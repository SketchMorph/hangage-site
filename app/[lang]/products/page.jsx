"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProductsPage({ params }) {
  const { lang } = params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("product")
        .select("id, name_ko, name_en, name_fr, name_ja, name_zh, price, images")
        .eq("is_active", true);
      if (!error) setProducts(data);
    }
    load();
  }, [lang]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {products.map((p) => (
          <Link key={p.id} href={`/${lang}/product/${p.id}`}>
            <div className="border rounded-lg p-4">
              <img src={p.images?.[0]} alt={p[`name_${lang}`] || p.name_ko} />
              <h2 className="font-semibold mt-2">{p[`name_${lang}`] || p.name_ko}</h2>
              <p>{p.price.toLocaleString()} 원</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
