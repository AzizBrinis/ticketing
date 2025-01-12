import { getCurrentUserAction } from "@/actions/getCurrentUserAction";

export const revalidate = 0;

export default async function Home() {
  const currentUser = await getCurrentUserAction();
  console.log(currentUser);
  return <h1>{currentUser ? "You Are Signed In" : "You Are NOT Signed In"}</h1>;
}
