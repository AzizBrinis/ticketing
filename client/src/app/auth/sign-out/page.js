"use client";

import { useEffect } from "react";
import useRequest from "../../../hooks/use-request";
export default function SignOutPage() {
  const { doRequest } = useRequest({
    url: "/api/users/sign-out",
    method: "post",
    body: {},
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out ...</div>;
}
