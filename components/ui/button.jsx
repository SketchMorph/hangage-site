import React from "react";

export function Button({ variant = "default", className = "", children, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium border shadow-sm hover:shadow transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-white text-black border-gray-200 hover:bg-gray-50 focus:ring-gray-300",
    blue: "bg-blue-500 text-white border-blue-600 hover:bg-blue-600 focus:ring-blue-400",
    green: "bg-green-500 text-white border-green-600 hover:bg-green-600 focus:ring-green-400",
    yellow: "bg-yellow-400 text-black border-yellow-500 hover:bg-yellow-500 focus:ring-yellow-300",
    red: "bg-red-500 text-white border-red-600 hover:bg-red-600 focus:ring-red-400",
    gray: "bg-gray-200 text-black border-gray-300 hover:bg-gray-300 focus:ring-gray-400",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
