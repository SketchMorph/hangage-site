export function Button({ className = "", children, ...props }) {
  // "bg-blue"가 포함된 경우에만 text-white 적용
  const isBlue = /\bbg-blue/.test(className);
  
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium border border-gray-200 shadow-sm hover:shadow transition ${isBlue ? "text-white" : "text-black"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
