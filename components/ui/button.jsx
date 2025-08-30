export function Button({ className = "", children, ...props }) {
  const isBlue = className.includes("bg-blue");
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium border border-gray-200 shadow-sm hover:shadow transition ${isBlue ? "text-white" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
