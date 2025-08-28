"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    if (error) setMsg("로그인 실패: " + error.message);
    else setMsg("로그인 성공!");
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <form onSubmit={login} className="space-y-3">
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="이메일" />
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="비밀번호" />
        <button type="submit">로그인</button>
      </form>
      <p>{msg}</p>
    </main>
  );
}
