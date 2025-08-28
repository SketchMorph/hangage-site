import { supabase } from "../../lib/supabaseClient";

export default async function ProductsPage() {
  const { data: products } = await supabase.from("products").select("*");

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">전체 상품</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map((p) => (
          <a href={`/products/${p.id}`} key={p.id} className="rounded-xl shadow p-4 block">
            <img src={p.images?.[0]} alt={p.name} className="rounded-lg mb-2"/>
            <h3 className="font-semibold">{p.name}</h3>
            <p>{p.price}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
