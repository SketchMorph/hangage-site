"use client";
import React from "react";

export default function LoginForm({ dict }) {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{dict.login.title}</h1>
      <form className="space-y-4">
        <input
          type="email"
          placeholder={dict.login.email}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder={dict.login.password}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded">
          {dict.login.button}
        </button>
      </form>
    </div>
  );
}
