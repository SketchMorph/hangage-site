"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProductDetail() {
  const { id, lang } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) setProduct(data);
    }
    load();
  }, [id, lang]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">{product[`name_${lang}`] || product.name_ko}</h1>
      <img src={product.images?.[0]} alt={product.name_ko} className="mt-4" />
      <p className="mt-4">{product[`description_${lang}`] || product.description_ko}</p>
      <p className="mt-2 font-semibold">{product.price.toLocaleString()} 원</p>
    </div>
  );
}
