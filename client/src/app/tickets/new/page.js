"use client";

import { useState } from "react";
import useRequest from "../../../hooks/use-request";
import { useRouter } from "next/navigation";

function NewTicket() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => router.push("/"),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label className="form-group">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label className="form-group">Price</label>
          <input
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            onBlur={onBlur}
          />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default NewTicket;
