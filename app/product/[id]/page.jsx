"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/supabaseQueries";
import { useTranslation } from "@/lib/useTranslation";
import AddToCartButton from "@/components/AddToCartButton";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const dynamic = "force-dynamic";

export default function ProductDetail() {
  const { id } = useParams();
  const { locale } = useTranslation();
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await getProductById(id);
      setProduct(data);
    }
    if (id) fetchData();
  }, [id]);

  if (!product) return <p className="p-6">상품을 찾을 수 없습니다.</p>;

  // 다국어 필드 선택
  const name = product[`name_${locale}`] || product.name_ko;
  const description = product[`description_${locale}`] || product.description_ko;

// ✅ 바로 구매 → orders 테이블 저장
async function handleBuyNow() {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    alert("로그인 후 이용해주세요!");
    return;
  }

  const orderItem = {
    product_id: product.id,
    name: name, // ✅ 다국어 이름 저장
    image: product.images?.[0] || "/no-image.png",
    qty: 1,
    price: product.price,
  };

  const { error } = await supabase.from("orders").insert([
    {
      user_id: user.data.user.id,
      items: [orderItem], // ✅ JSON 배열에 상세정보까지
      total_price: product.price,
      status: "pending",
    },
  ]);

  if (error) {
    console.error(error);
    alert("주문에 실패했습니다.");
  } else {
    alert("주문이 완료되었습니다! (결제 대기중)");
    router.push("/orders");
  }
}

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* 이미지 슬라이더 */}
      <div className="flex gap-4 overflow-x-auto mb-6">
        {product.images?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={name}
            className="w-64 h-80 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* 상품 정보 */}
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-gray-500 mb-4">{product.price} 원</p>
      <p className="mb-6">{description}</p>

      {/* 옵션 */}
      <div className="mb-6">
        {product.sizes?.length > 0 && (
          <p>사이즈: {product.sizes.join(", ")}</p>
        )}
        {product.colors?.length > 0 && (
          <p>색상: {product.colors.join(", ")}</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex gap-4">
        <AddToCartButton productId={product.id} />
        <button
          onClick={handleBuyNow}
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50"
        >
          바로 구매
        </button>
      </div>
    </div>
  );
}
