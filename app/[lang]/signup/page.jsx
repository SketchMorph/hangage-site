"use client";
export default function SignupPage({ params }) {
  const { lang } = params;
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1>{lang.toUpperCase()} Signup</h1>
    </div>
  );
}
