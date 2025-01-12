"use server";

import axios from "axios";
import { headers } from "next/headers";

export async function getOrderByIdAction(id) {
  const requestHeaders = await headers();

  const { data } = await axios.get(
    `http://www.ticketing-app-dev.xyz/api/orders/${id}`,
    {
      headers: requestHeaders,
    }
  );
  return data;
}
export async function getOrders() {
  const requestHeaders = await headers();

  const { data } = await axios.get(
    "http://www.ticketing-app-dev.xyz/api/orders",
    {
      headers: requestHeaders,
    }
  );
  return data;
}
