export const runtime = "nodejs"; // ✅ Edge 런타임에서 Stripe 불가, Node.js 런타임 강제

import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20", // Stripe 최신 API 버전
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, orderId } = body;

    if (!items || !orderId) {
      return NextResponse.json(
        { error: "Missing items or orderId" },
        { status: 400 }
      );
    }

    // ✅ Stripe Checkout 세션 생성
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // 단위: 센트
        },
        quantity: item.qty,
      })),
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders/success?orderId=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders/cancel?orderId=${orderId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
