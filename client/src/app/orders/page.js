import { getOrders } from "@/actions/ordersActions";

async function OrdersPage() {
  const orders = await getOrders();
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </ul>
  );
}

export default OrdersPage;
