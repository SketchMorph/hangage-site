import React from "react";

export function Button({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) {
  // 공통 기본 스타일
  const base =
    "inline-flex items-center justify-center font-medium border shadow-sm hover:shadow transition focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-2xl";

  // 색상 옵션
  const variants = {
    default: "bg-blue-500 text-white border-blue-600 hover:bg-blue-600 focus:ring-blue-400",
    white: "bg-white text-blue-600 border border-blue-500 hover:bg-gray-50 focus:ring-blue-300",
    green: "bg-green-500 text-white border-green-600 hover:bg-green-600 focus:ring-green-400",
    yellow: "bg-yellow-400 text-black border-yellow-500 hover:bg-yellow-500 focus:ring-yellow-300",
    red: "bg-red-500 text-white border-red-600 hover:bg-red-600 focus:ring-red-400",
    gray: "bg-gray-200 text-black border-gray-300 hover:bg-gray-300 focus:ring-gray-400",
  };

  // 크기 옵션
  const sizes = {
    sm: "px-3 py-1.5 text-xs",   // 작은 버튼
    md: "px-4 py-2 text-sm",     // 중간 버튼 (기본)
    lg: "px-6 py-3 text-base",   // 큰 버튼
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
