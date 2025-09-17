"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LookbookDetail({ lang = "ko" }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("lookbook")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setItem(data);
    }
    if (id) load();
  }, [id]);

  if (!item) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {item[`title_${lang}`] || item.title_ko}
      </h1>
      <p className="text-gray-700 mb-8">
        {item[`description_${lang}`] || item.description_ko}
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {item.images?.map((src, i) => (
          <div key={i} className="rounded-2xl overflow-hidden bg-gray-100">
            <img src={src} alt={`lookbook-${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
