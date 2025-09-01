"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex gap-2 overflow-x-auto">
        {product.images?.map((img, i) => (
          <img key={i} src={img} alt={product.name_ko} className="w-64 rounded-xl" />
        ))}
      </div>
      <h1 className="text-2xl font-bold mt-4">{product.name_ko}</h1>
      <p className="text-lg text-gray-600">{product.price}원</p>
      <p className="mt-2">{product.description_ko}</p>
    </div>
  );
}
