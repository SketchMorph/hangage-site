"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LookbookList({ lang = "ko" }) {
  const params = useSearchParams();
  const category = params.get("cat");
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("lookbook")
        .select("*")
        .eq("category", category)
        .eq("is_active", true);

      if (!error) setItems(data || []);
    }
    if (category) load();
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-2xl md:text-3xl font-bold">{category}</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {items.map((item) => (
          <Link key={item.id} href={`/${lang}/lookbook/${item.id}`}>
            <Card className="rounded-2xl overflow-hidden">
              <div className="aspect-[3/2] bg-gray-100">
                <img
                  src={item.images?.[0] || "/no-image.png"}
                  alt={item[`title_${lang}`] || item.title_ko}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="font-semibold">
                  {item[`title_${lang}`] || item.title_ko}
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {item[`description_${lang}`] || item.description_ko}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
