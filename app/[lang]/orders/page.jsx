"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function OrdersPage({ params }) {
  const { lang } = params;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("orders").select("*");
      setOrders(data || []);
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">{lang.toUpperCase()} Orders</h1>
      {orders.map((o) => (
        <div key={o.id} className="border p-4 mt-4">
          <p>상태: {o.status}</p>
          <p>총액: {o.total_price.toLocaleString()} 원</p>
        </div>
      ))}
    </div>
  );
}
