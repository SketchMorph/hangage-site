"use client";
import React from "react";

export default function SignupForm({ dict }) {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{dict.signup.title}</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder={dict.signup.name}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder={dict.signup.email}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder={dict.signup.password}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-green-500 text-white p-2 rounded">
          {dict.signup.button}
        </button>
      </form>
    </div>
  );
}
