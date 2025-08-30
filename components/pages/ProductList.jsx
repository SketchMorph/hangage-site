"use client";
import React from "react";

export default function ProductList({ dict }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{dict.products.title}</h1>
      <ul className="space-y-2">
        <li className="p-4 border rounded">{dict.products.sample1}</li>
        <li className="p-4 border rounded">{dict.products.sample2}</li>
      </ul>
    </div>
  );
}
