import { House, Search, Bell, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <nav aria-label="Primary">
        <a
          href=""
          className="nav-btn"
          aria-label="Home-page-button"
          aria-current="page"
        >
          <House />
        </a>

        <a href="" className="nav-btn" aria-label="Search-page-button">
          <Search />
        </a>

        <a href="" className="nav-btn" aria-label="notification-page-button">
          <Bell />
        </a>

        <a href="" className="nav-btn" aria-label="direct-message-page-button">
          <MessageCircle />
        </a>
      </nav>
    </footer>
  );
}
