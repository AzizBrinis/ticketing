"use server";

import { headers } from "next/headers";

export async function authAction({ email, password }) {
  const requestHeaders = await headers();

  const response = await fetch(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/sign-up",
    {
      method: "POST",
      headers: {
        ...requestHeaders, // Include additional headers
        "Content-Type": "application/json",
      },
      body: { email, password },
    }
  );

  console.log(response);
  return response;
}
