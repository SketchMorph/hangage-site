"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AddToCartButton({ productId }) {
  async function addToCart() {
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      alert("로그인 후 이용해주세요!");
      return;
    }

    // 동일 상품이 이미 장바구니에 있는지 확인
    const { data: existing } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user.data.user.id)
      .eq("product_id", productId)
      .single();

    if (existing) {
      // 이미 있으면 수량 증가
      const { error } = await supabase
        .from("cart")
        .update({ quantity: existing.quantity + 1 })
        .eq("id", existing.id);
      if (error) console.error(error);
      alert("장바구니 수량이 추가되었습니다!");
    } else {
      // 없으면 새로 추가
      const { error } = await supabase.from("cart").insert([
        {
          user_id: user.data.user.id,
          product_id: productId,
          quantity: 1,
        },
      ]);
      if (error) console.error(error);
      alert("장바구니에 담겼습니다!");
    }
  }

  return (
    <button
      onClick={addToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      장바구니 담기
    </button>
  );
}
