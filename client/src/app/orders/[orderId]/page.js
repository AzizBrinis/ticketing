import { getOrderByIdAction } from "@/actions/ordersActions";
import { getCurrentUserAction } from "@/actions/getCurrentUserAction";
import OrderPay from "@/components/OrderPay";

async function OrderPage({ params }) {
  const { orderId } = await params;
  const currentUser = await getCurrentUserAction();
  const order = await getOrderByIdAction(orderId);
  return (
    <>
      <OrderPay order={order} currentUser={currentUser} />
    </>
  );
}

export default OrderPage;
