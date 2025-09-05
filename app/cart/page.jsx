"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CartPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) return;

    const { data, error } = await supabase
      .from("cart")
      .select("id, quantity, product:product_id(id, name_ko, price, images)")
      .eq("user_id", user.data.user.id);

    if (error) console.error(error);
    else setItems(data || []);
  }

  async function removeItem(id) {
    const { error } = await supabase.from("cart").delete().eq("id", id);
    if (error) console.error(error);
    loadCart();
  }

  async function updateQuantity(id, newQty) {
    if (newQty < 1) return;
    const { error } = await supabase
      .from("cart")
      .update({ quantity: newQty })
      .eq("id", id);
    if (error) console.error(error);
    loadCart();
  }

  // ✅ Stripe 결제 연동
  async function handleCheckout() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      alert("로그인 후 이용해주세요!");
      return;
    }

    if (items.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }

    // items → 주문용 데이터 변환
    const orderItems = items.map((item) => ({
      product_id: item.product.id,
      name: item.product.name_ko,
      image: item.product.images?.[0] || "/no-image.png",
      qty: item.quantity,
      price: item.product.price,
    }));

    const totalPrice = orderItems.reduce(
      (sum, it) => sum + it.price * it.qty,
      0
    );

    // 1) 주문 생성 (status: pending)
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.data.user.id,
          items: orderItems,
          total_price: totalPrice,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("주문 생성 실패");
      return;
    }

    // 2) Stripe Checkout 세션 생성 요청
const res = await fetch("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ items: orderItems, orderId: data.id }),
});

if (!res.ok) {
  console.error("Checkout API error:", await res.text());
  alert("결제 세션 생성 실패");
  return;
}

const { url } = await res.json();
if (url) {
  window.location.href = url;
} else {
  alert("Stripe 세션 생성 실패");
}

  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">장바구니</h2>
      {items.length === 0 && <p>장바구니가 비어 있습니다.</p>}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.images?.[0] || "/no-image.png"}
                alt={item.product.name_ko}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.product.name_ko}</p>
                <p>{item.product.price}원</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 border rounded"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 border rounded"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="ml-4 text-red-500"
                onClick={() => removeItem(item.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-6 text-right">
          <p className="text-lg font-bold mb-2">
            총 금액: {totalPrice.toLocaleString()}원
          </p>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            구매하기
          </button>
        </div>
      )}
    </div>
  );
}
