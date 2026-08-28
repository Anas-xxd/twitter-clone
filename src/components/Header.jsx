import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header>
      <button className="menu-btn">
        <Menu />
      </button>

      <div className="logo-container">
        <svg id="logo"></svg>
      </div>

      <button className="account-btn">
        <img className="avatar" src="" alt="" />
      </button>
    </header>
  );
}
