"use client";

import { useState } from "react";
import useRequest from "../../../hooks/use-request";
import { redirect } from "next/navigation";
import { authAction } from "../../../actions/authActions";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { doRequest, errors } = useRequest({
  //   url: "/api/users/sign-up",
  //   method: "post",
  //   body: {
  //     email,
  //     password,
  //   },
  // });

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await authAction({ email, password });

    console.log(response);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
