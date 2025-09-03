"use client";
import { useState } from "react";
import { useTranslation } from "@/lib/useTranslation";

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6">{t("login.title")}</h1>

        <label className="block mb-2 text-sm">{t("login.email")}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full mb-4 px-3 py-2 rounded"
        />

        <label className="block mb-2 text-sm">{t("login.password")}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full mb-4 px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-lg"
        >
          {t("login.submit")}
        </button>

        <p className="text-center text-sm mt-4">
          {t("login.signup")}
        </p>
      </form>
    </div>
  );
}
