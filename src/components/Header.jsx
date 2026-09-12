import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import FeedTypeTab from "./FeedTypeTabs";
import { useVisibility } from "../hooks/useVisibility";
import { Menu } from "lucide-react";

export default function Header() {
  const isVisible = useVisibility(20);

  function showNavBar() {
    document.querySelector(".nav-bar").classList.toggle("invisible");
    document.querySelector(".gray-background").classList.toggle("invisible");
  }

  return (
    <header className={isVisible ? "header-visible" : "header-hidden"}>
      <div className="header-container">
        <button className="btn menu-btn" onClick={showNavBar}>
          <Menu />
        </button>

        <div className="logo-container">
          <img src={logo} id="logo" alt="Logo" />
        </div>

        <a href="" className="btn account-btn">
          <img className="avatar" src={avatar} alt="Avatar" />
        </a>
      </div>

      <FeedTypeTab />
    </header>
  );
}
