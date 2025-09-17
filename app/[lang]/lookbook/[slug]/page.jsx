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
  const [lookbooks, setLookbooks] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from("lookbook")
        .select("*")
        .eq("season", slug) // ← 여기 slug 기준 (season 컬럼 사용)
        .eq("is_active", true);

      if (error) {
        console.error(error);
        return;
      }
      setLookbooks(data || []);
    }
    loadData();
  }, [slug]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{slug} 룩북</h1>

      {lookbooks.length === 0 ? (
        <p className="text-gray-500">아직 등록된 룩북이 없습니다.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lookbooks.map((lb) => (
            <Card key={lb.id} className="rounded-2xl overflow-hidden">
              <div className="aspect-[3/4] bg-gray-100">
                <img
                  src={lb.images?.[0] || "/placeholder.jpg"}
                  alt={lb[`title_${lang}`] || lb.title_ko}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">
                  {lb[`title_${lang}`] || lb.title_ko}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {lb[`description_${lang}`] || lb.description_ko}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
