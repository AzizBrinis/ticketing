"use server";

export async function authAction(formState, formData) {
  const { email, password } = Object.fromEntries(formData.entries());

  console.log(email, password);

  const response = await fetch(
    "http://www.ticketing-app-dev.xyz/api/users/sign-up",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { email, password },
    }
  );
  console.log(response);

  // return {
  //   errors: {
  //     message: [...error.response.data.errors],
  //   },
  // };
}
