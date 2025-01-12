// app/api/users/sign-up/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    // Make a request to your backend API using fetch
    const res = await fetch(
      "http://www.ticketing-app-dev.xyz/api/users/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { errors: errorData.errors },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { errors: [{ message: "Something went wrong" }] },
      { status: 500 }
    );
  }
}
