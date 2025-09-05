"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLookbookWithProducts } from "@/lib/getLookbook";
import Link from "next/link";

export default function LookbookDetail() {
  const { id } = useParams();
  const [lookbook, setLookbook] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getLookbookWithProducts(id);
      setLookbook(data);
    }
    if (id) fetchData();
  }, [id]);

  if (!lookbook) return <p className="p-6">Loading...</p>;

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* 타이틀 & 시즌 */}
      <h1 className="text-3xl font-bold mb-2">{lookbook.title_ko}</h1>
      <p className="text-gray-600 mb-6">시즌: {lookbook.season}</p>

      {/* 룩북 이미지 */}
      {lookbook.images?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-10">
          {lookbook.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`lookbook-${i}`}
              className="rounded-lg"
            />
          ))}
        </div>
      )}

      {/* 설명 */}
      {lookbook.description_ko && (
        <p className="text-gray-700 mb-10">{lookbook.description_ko}</p>
      )}

      {/* 관련 상품 */}
      <h2 className="text-2xl font-semibold mb-4">관련 상품</h2>
      {lookbook.lookbook_products?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {lookbook.lookbook_products.map((lp) => {
            const p = lp.product;
            if (!p) return null;
            return (
              <div
                key={p.id}
                className="border rounded-lg p-4 hover:shadow-lg transition"
              >
                <img
                  src={p.images?.[0] || "/no-image.png"}
                  alt={p.name_ko}
                  className="rounded-md mb-2 w-full h-40 object-cover"
                />
                <h3 className="font-bold">{p.name_ko}</h3>
                <p className="text-gray-500 mb-2">
                  {p.price.toLocaleString()}원
                </p>
                <Link
                  href={`/product/${p.id}`}
                  className="text-blue-600 underline text-sm"
                >
                  상세 보기
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">연결된 상품이 없습니다.</p>
      )}
    </main>
  );
}
