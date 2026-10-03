import logo from "../../assets/logo.svg";
import FeedTab from "./FeedTabs";
import "./Header.css";
import { useVisibility } from "../../hooks/useVisibility";
import { Menu } from "lucide-react";

export default function Header({ toggleSidebar }) {
  const isVisible = useVisibility(20);

  return (
    <header className={isVisible ? "" : "hidden"}>
      <div className="header__container">
        <button className="btn header__menu-btn" onClick={toggleSidebar}>
          <Menu />
        </button>

        <div className="header__logo-container">
          <img src={logo} className="header__logo" alt="Logo" />
        </div>

        <a href="" className="btn account-btn">
          <img className="avatar" src="/avatar.svg" alt="Avatar" />
        </a>
      </div>

      <FeedTab />
    </header>
  );
}
