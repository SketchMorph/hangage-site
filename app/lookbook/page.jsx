"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const dynamic = "force-dynamic"; // 항상 동적 렌더링

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LookbooksPage() {
  const [lookbooks, setLookbooks] = useState([]);

  useEffect(() => {
    loadLookbooks();
  }, []);

  async function loadLookbooks() {
    const { data, error } = await supabase
      .from("lookbook")
      .select("id, title_ko, season, images")
      .eq("is_active", true);
    if (error) console.error(error);
    else setLookbooks(data || []);
  }

  if (lookbooks.length === 0) {
    return <p className="p-6">등록된 룩북이 없습니다.</p>;
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">룩북</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lookbooks.map((lb) => (
          <Link
            key={lb.id}
            href={`/lookbook/${lb.id}`}
            className="block border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={lb.images?.[0] || "/no-image.png"}
              alt={lb.title_ko}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{lb.title_ko}</h2>
              <p className="text-gray-600 text-sm">시즌: {lb.season}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
