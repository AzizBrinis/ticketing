"use client";

import { useEffect } from "react";
import useRequest from "../../../hooks/use-request";
import { redirect } from "next/navigation";

export default function SignOutPage() {
  const { doRequest } = useRequest({
    url: "/api/users/sign-out",
    method: "post",
    body: {},
  });

  useEffect(async () => {
    await doRequest();

    redirect("/");
  }, []);

  return <div>Signing you out ...</div>;
}
