"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password: pw });
    if (error) setMsg("회원가입 실패: " + error.message);
    else setMsg("회원가입 성공!");
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <form onSubmit={signup} className="space-y-3">
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="이메일" />
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="비밀번호" />
        <button type="submit">회원가입</button>
      </form>
      <p>{msg}</p>
    </main>
  );
}
