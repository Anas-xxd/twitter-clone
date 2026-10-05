import "./Footer.css";
import { House, Search, Bell, MessageCircle } from "lucide-react";
import { useVisibility } from "../../hooks/useVisibility";

export default function Footer() {
  const isVisible = useVisibility(20);

  return (
    <footer className={isVisible ? "" : "hidden"}>
      <nav className="footer__main-nav" aria-label="Primary">
        <a
          href=""
          className="btn main-nav__btn"
          aria-label="Home-page-button"
          aria-current="page"
        >
          <House />
        </a>

        <a
          href=""
          className="btn main-nav__btn"
          aria-label="Search-page-button"
        >
          <Search />
        </a>

        <a
          href=""
          className="btn main-nav__btn"
          aria-label="notification-page-button"
        >
          <Bell />
        </a>

        <a
          href=""
          className="btn main-nav__btn"
          aria-label="direct-message-page-button"
        >
          <MessageCircle />
        </a>
      </nav>
    </footer>
  );
}
