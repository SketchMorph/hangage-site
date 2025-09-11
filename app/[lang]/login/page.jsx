"use client";
export default function LoginPage({ params }) {
  const { lang } = params;
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1>{lang.toUpperCase()} Login</h1>
    </div>
  );
}
