"use server";

import axios from "axios";
import { headers } from "next/headers";

export async function getTicketsAction() {
  const requestHeaders = await headers();

  const { data } = await axios.get(
    "http://www.ticketing-app-dev.xyz/api/tickets",
    {
      headers: requestHeaders,
    }
  );
  return data;
}
