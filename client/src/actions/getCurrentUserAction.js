"user server";

import axios from "axios";
import { headers } from "next/headers";

export async function getCurrentUserAction() {
  const requestHeaders = await headers();

  const {
    data: { currentUser },
  } = await axios.get(
    "http://www.ticketing-app-dev.xyz/api/users/current-user",
    {
      headers: requestHeaders,
    }
  );
  return currentUser;
}
