import { supabase } from "../../../lib/supabaseClient";

export default async function ProductDetail({ params }) {
  const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single();

  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <p className="text-xl text-gray-700 mb-4">{product.price}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {product.images?.map((img, idx) => (
          <img key={idx} src={img} alt={`${product.name}-${idx}`} className="rounded-xl shadow"/>
        ))}
      </div>
      <p className="text-gray-600">{product.description}</p>
    </main>
  );
}
