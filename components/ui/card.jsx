export function Card({ className = "", children, ...props }) {
  return (
    <div className={`rounded-2xl border border-gray-200 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
}
export function CardHeader({ className = "", children }) {
  return <div className={`p-4 border-b border-gray-100 ${className}`}>{children}</div>;
}
export function CardTitle({ className = "", children }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}
export function CardContent({ className = "", children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}