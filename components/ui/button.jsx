export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium border border-gray-200 shadow-sm hover:shadow transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}