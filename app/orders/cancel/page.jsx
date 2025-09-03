"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";

export default function CancelPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">결제가 취소되었습니다 ❌</h1>
      <p>주문 번호: {orderId}</p>
    </div>
  );
}
