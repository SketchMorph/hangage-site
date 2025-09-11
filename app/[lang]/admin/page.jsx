"use client";
export default function AdminPage({ params }) {
  const { lang } = params;
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1>{lang.toUpperCase()} Admin Page</h1>
      <p>여기서 상품 추가/수정 기능 붙이기</p>
    </div>
  );
}
