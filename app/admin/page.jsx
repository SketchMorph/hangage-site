"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (uploadError) {
      alert("업로드 실패: " + uploadError.message);
      return;
    }

    const { data: { publicUrl } } = supabase
      .storage.from("product-images")
      .getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("products").insert([
      { name, price, description, images: [publicUrl] }
    ]);

    if (insertError) alert("DB 저장 실패: " + insertError.message);
    else alert("상품 등록 완료!");
  };

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">관리자 상품 업로드</h1>
      <form onSubmit={handleUpload} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="상품명" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="가격" />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="설명"></textarea>
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button type="submit">등록하기</button>
      </form>
    </main>
  );
}
