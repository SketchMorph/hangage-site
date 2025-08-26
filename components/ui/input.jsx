import React from "react";
export const Input = React.forwardRef(function Input(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-200 ${className}`}
      {...props}
    />
  );
});