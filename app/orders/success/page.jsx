import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function SuccessPage({ searchParams }) {
  const orderId = searchParams.orderId;

  if (orderId) {
    await supabase.from("orders").update({ status: "paid" }).eq("id", orderId);
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">결제가 완료되었습니다 🎉</h1>
      <p>주문 번호: {orderId}</p>
    </div>
  );
}

