"use client";

import Link from "next/link";

export const dynamic = "force-dynamic"; // ✅ 동적 렌더링 강제

export default function CancelPage({ searchParams }) {
  const orderId = searchParams.orderId;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">결제가 취소되었습니다 ❌</h1>
      <p className="mb-6">주문 번호: {orderId}</p>

      <Link
        href="/cart"
        className="px-4 py-2 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white"
      >
        장바구니로 돌아가기
      </Link>
    </div>
  );
}
