import { House, Search, Bell, MessageCircle } from "lucide-react";
import { useVisibility } from "../hooks/useVisibility";

export default function Footer() {
  const isVisible = useVisibility(20);

  return (
    <footer className={isVisible ? "" : "footer-hidden"}>
      <nav className="main-nav" aria-label="Primary">
        <a
          href=""
          className="btn nav-btn"
          aria-label="Home-page-button"
          aria-current="page"
        >
          <House />
        </a>

        <a href="" className="btn nav-btn" aria-label="Search-page-button">
          <Search />
        </a>

        <a
          href=""
          className="btn nav-btn"
          aria-label="notification-page-button"
        >
          <Bell />
        </a>

        <a
          href=""
          className="btn nav-btn"
          aria-label="direct-message-page-button"
        >
          <MessageCircle />
        </a>
      </nav>
    </footer>
  );
}
