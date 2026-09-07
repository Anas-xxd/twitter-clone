import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import FeedTypeTab from "./FeedTypeTabs";
import { Menu } from "lucide-react";

export default function Header() {
  function showNavBar() {
    document.querySelector(".nav-bar").classList.toggle("invisible");
    document.querySelector(".gray-background").classList.toggle("invisible");
  }

  return (
    <header>
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
