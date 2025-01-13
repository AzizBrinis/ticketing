// import { getCurrentUserAction } from "@/actions/getCurrentUserAction";
import { getTicketsAction } from "@/actions/ticketsAction";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  // const currentUser = await getCurrentUserAction();
  const tickets = await getTicketsAction();
  console.log(tickets);
  // return <h1>{currentUser ? "You Are Signed In" : "You Are NOT Signed In"}</h1>;
  return (
    <div>
      <h1>Ticket</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {tickets?.length > 0 &&
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                  <Link href={`/tickets/${ticket.id}`}>View</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
