"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/supabaseQueries";
import { useTranslation } from "@/lib/useTranslation";

export const dynamic = "force-dynamic"; // 빌드 에러 방지

export default function ProductDetail() {
  const { id } = useParams();
  const { locale } = useTranslation();
  const [product, setProduct] = useState(null);

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
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          장바구니
        </button>
        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg">
          바로 구매
        </button>
      </div>
    </div>
  );
}
