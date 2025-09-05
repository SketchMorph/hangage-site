"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const dynamic = "force-dynamic"; // ✅ 동적 렌더링 강제

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SuccessPage({ searchParams }) {
  const orderId = searchParams.orderId;

  useEffect(() => {
    async function markAsPaid() {
      const { error } = await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("id", orderId);
      if (error) {
        console.error("주문 업데이트 실패:", error);
      }
    }
    if (orderId) markAsPaid();
  }, [orderId]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">결제가 완료되었습니다 🎉</h1>
      <p className="mb-6">주문 번호: {orderId}</p>

      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-4 py-2 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white"
        >
          메인으로 돌아가기
        </Link>
        <Link
          href="/orders"
          className="px-4 py-2 rounded-2xl border border-blue-900 text-blue-900 hover:bg-blue-50"
        >
          내 주문 확인
        </Link>
      </div>
    </div>
  );
}
