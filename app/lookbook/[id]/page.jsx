"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLookbookWithProducts } from "@/lib/getLookbook";

export default function LookbookDetail() {
  const { id } = useParams();
  const [lookbook, setLookbook] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getLookbookWithProducts(id);
      setLookbook(data);
    }
    fetchData();
  }, [id]);

  if (!lookbook) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{lookbook.title_ko}</h1>
      <p className="text-gray-600 mb-6">시즌: {lookbook.season}</p>

      {/* 룩북 이미지 */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {lookbook.images?.map((img, i) => (
          <img key={i} src={img} alt="lookbook" className="rounded-lg" />
        ))}
      </div>

      {/* 관련 상품 */}
      <h2 className="text-2xl font-semibold mb-4">관련 상품</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {lookbook.lookbook_products?.map((lp) => {
          const p = lp.product;
          return (
            <div key={p.id} className="border rounded-lg p-4">
              <img
                src={p.images?.[0]}
                alt={p.name_ko}
                className="rounded-md mb-2"
              />
              <h3 className="font-bold">{p.name_ko}</h3>
              <p className="text-gray-500">{p.price}원</p>
              <a
                href={`/product/${p.id}`}
                className="text-blue-600 underline text-sm"
              >
                상세 보기
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
