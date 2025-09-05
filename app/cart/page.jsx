export const runtime = "nodejs"; // ✅ Stripe는 Edge 런타임에서 동작 불가, Node.js 런타임 강제

import Stripe from "stripe";
import { NextResponse } from "next/server";

// ✅ 환경 변수 안전 체크
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY is not defined in environment variables");
}
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error("❌ NEXT_PUBLIC_SITE_URL is not defined in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, orderId } = body;

    // ✅ 입력값 검증
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // ✅ Stripe Checkout 세션 생성
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd", // ⚠️ 필요 시 "krw" 등 변경 가능
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // 금액 단위: 센트
        },
        quantity: item.qty,
      })),
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders/success?orderId=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders/cancel?orderId=${orderId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
