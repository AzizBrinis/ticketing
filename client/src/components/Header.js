import { getCurrentUserAction } from "@/actions/getCurrentUserAction";
import Link from "next/link";

export const revalidate = 0;

async function Header() {
  const currentUser = await getCurrentUserAction();
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/sign-up" },
    !currentUser && { label: "Sign In", href: "/auth/sign-in" },
    currentUser && { label: "Sell Ticket", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/sign-out" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} className="nav-link">
            {label}
          </Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/" className="navbar-brand">
        GitTix
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
}

export default Header;
