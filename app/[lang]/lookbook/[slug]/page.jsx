"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LookbookPage() {
  const { lang, slug } = useParams();
  const [lookbook, setLookbook] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      // 1. 해당 slug 룩북 불러오기
      const { data: lb, error: lbError } = await supabase
        .from("lookbook")
        .select("*")
        .eq("season", slug)
        .eq("is_active", true)
        .single();

      if (lbError || !lb) {
        console.error(lbError);
        return;
      }
      setLookbook(lb);

      // 2. 연결된 상품 불러오기
      const { data: items, error: joinError } = await supabase
        .from("lookbook_products")
        .select("product(*)")
        .eq("lookbook_id", lb.id);

      if (joinError) {
        console.error(joinError);
        return;
      }

      setProducts(items.map((i) => i.product));
    }

    loadData();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* 타이틀 */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          {lookbook?.[`title_${lang}`] || lookbook?.title_ko || slug}
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          {lookbook?.[`description_${lang}`] ||
            lookbook?.description_ko ||
            `계절과 조화를 이루는 ${slug} 컬렉션을 만나보세요.`}
        </p>

        {/* 연결된 상품 카드 */}
        {products.length === 0 ? (
          <p className="text-gray-500">아직 등록된 상품이 없습니다.</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {products.map((p) => (
              <Card
                key={p.id}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={p.images?.[0] || "/placeholder.jpg"}
                    alt={p[`name_${lang}`] || p.name_ko}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardContent className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {p[`name_${lang}`] || p.name_ko}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {p.price ? `${p.price.toLocaleString()} 원` : "문의 가능"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
