"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const dynamic = "force-dynamic"; // ✅ 항상 최신 데이터

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);

    // 현재 로그인한 유저 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("로그인 필요:", userError);
      setOrders([]);
      setLoading(false);
      return;
    }

    // 해당 유저의 주문 조회
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("주문 조회 실패:", error);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return <p className="p-6">불러오는 중...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>아직 주문 내역이 없습니다.</p>
        <Link
          href="/products"
          className="mt-4 inline-block px-4 py-2 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white"
        >
          상품 보러가기
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">내 주문 내역</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-2xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold">주문번호: {order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* 주문 상품 리스트 */}
            <ul className="divide-y divide-gray-200">
              {order.items?.map((item, i) => (
                <li key={i} className="py-2 flex items-center gap-4">
                  <img
                    src={item.image || "/no-image.png"}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover border"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.qty}개 × ${item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.qty * item.price).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            {/* 합계 */}
            <div className="mt-4 text-right font-bold">
              총 결제금액: ${order.total_price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
