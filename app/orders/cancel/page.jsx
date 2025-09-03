export default function CancelPage({ searchParams }) {
  const orderId = searchParams.orderId;

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">결제가 취소되었습니다 ❌</h1>
      <p>주문 번호: {orderId}</p>
    </div>
  );
}
