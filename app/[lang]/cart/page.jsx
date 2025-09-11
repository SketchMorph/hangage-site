"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CartPage({ params }) {
  const { lang } = params;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("cart").select("*, product(*)");
      setCart(data || []);
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">{lang.toUpperCase()} Cart</h1>
      {cart.map((c) => (
        <div key={c.id} className="border p-4 mt-4">
          <p>{c.product?.name_ko}</p>
          <p>수량: {c.quantity}</p>
        </div>
      ))}
    </div>
  );
}
