import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header>
      <button className="btn menu-btn">
        <Menu />
      </button>

      <div className="logo-container">
        <img src={logo} id="logo" alt="Logo" />
      </div>

      <a href="" className="btn account-btn">
        <img className="avatar" src={avatar} alt="Avatar" />
      </a>
    </header>
  );
}
