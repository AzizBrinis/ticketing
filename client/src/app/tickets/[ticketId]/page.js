"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import useRequest from "../../../hooks/use-request";

function TicketPage() {
  const params = useParams();
  const [ticket, setTicket] = useState();
  const router = useRouter();

  const { ticketId } = params;

  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId,
    },
    onSuccess: (order) => router.push(`/orders/${order.id}`),
  });

  useEffect(() => {
    const fetchTicket = async () => {
      const { data } = await axios.get(`/api/tickets/${ticketId}`);
      setTicket(data);
    };
    fetchTicket();
  }, []);
  return (
    <div>
      <h1>{ticket?.title}</h1>
      <h4>Price : {ticket?.price}</h4>
      {errors}
      <button className="btn btn-primary" onClick={() => doRequest()}>
        Purchase
      </button>
    </div>
  );
}

export default TicketPage;
