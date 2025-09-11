"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LookbookPage({ params }) {
  const { lang } = params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("lookbook")
        .select("id, title_ko, title_en, title_fr, title_ja, title_zh, description_ko, description_en, description_fr, description_ja, description_zh, images")
        .eq("is_active", true);
      setItems(data);
    }
    load();
  }, [lang]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">Lookbook</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            <img src={item.images?.[0]} alt={item[`title_${lang}`] || item.title_ko} />
            <div className="p-4">
              <h2>{item[`title_${lang}`] || item.title_ko}</h2>
              <p>{item[`description_${lang}`] || item.description_ko}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
