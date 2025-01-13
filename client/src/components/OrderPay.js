"use client";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../hooks/use-request";
import { useRouter } from "next/navigation";

function OrderPay({ order, currentUser }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => router.push("/orders"),
  });
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timeId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, [order]);
  if (timeLeft < 0) return <div>Order Expired</div>;
  return (
    <div>
      <h1>Time left to pay : {timeLeft} seconds</h1>
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51Qg15AKC8A8S1Grv2z26Rr2nGqvgBRQlibChLu8kHYq3q5hCsKBDWYiPFFllFn2LhQlgSfNIcs4PhFHdOEHaaQsk00XA7aZJep"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
}

export default OrderPay;
