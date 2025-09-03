"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  useEffect(() => {
    if (orderId) {
      supabase.from("orders").update({ status: "paid" }).eq("id", orderId);
    }
  }, [orderId]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">결제가 완료되었습니다 🎉</h1>
      <p>주문 번호: {orderId}</p>
    </div>
  );
}
