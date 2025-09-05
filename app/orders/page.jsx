"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic"; // ✅ 동적 렌더링 강제

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) return;

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.data.user.id)
      .order("created_at", { ascending: false });

    if (!error) setOrders(data || []);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">주문 내역</h2>
      {orders.length === 0 && <p>주문 내역이 없습니다.</p>}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">
                주문번호: <span className="text-gray-600">{order.id}</span>
              </p>
              <span
                className={`px-3 py-1 rounded text-sm ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              주문일시: {new Date(order.created_at).toLocaleString()}
            </p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">수량: {item.qty}</p>
                    </div>
                  </div>
                  <span className="font-semibold">
                    {item.price.toLocaleString()} 원
                  </span>
                </div>
              ))}
            </div>
            <div className="text-right mt-4 font-bold">
              총 금액: {order.total_price.toLocaleString()} 원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
