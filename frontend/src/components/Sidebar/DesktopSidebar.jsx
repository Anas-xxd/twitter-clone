import "./Sidebar.css";
import logo from "../../assets/logo.svg";
import {
  Heart,
  MessageCircle,
  UserRound,
  UserRoundPlus,
  Settings,
  LogOut,
  House,
  Search,
  Bell,
} from "lucide-react";

export default function DesktopSidebar() {
  return (
    <div className={`sidebar desktop-sidebar`}>
      <div className="logo-container">
        <img src={logo} className="logo" alt="Logo" />
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        <a
          href=""
          className="btn sidebar__btn"
          aria-label="Home-page-button"
          aria-current="page"
        >
          <House />
          <div className="sidebar__btn-title">Home</div>
        </a>

        <a href="" className="btn sidebar__btn" aria-label="Search-page-button">
          <Search />
          <div className="sidebar__btn-title">Explore</div>
        </a>

        <a
          href=""
          className="btn sidebar__btn"
          aria-label="notification-page-button"
        >
          <Bell />
          <div className="sidebar__btn-title">Notifications</div>
        </a>

        <a
          href=""
          className="btn sidebar__btn"
          aria-label="direct-message-page-button"
        >
          <MessageCircle />
          <div className="sidebar__btn-title">Chat</div>
        </a>

        <a
          href=""
          className="btn sidebar__btn"
          aria-label="direct-message-page-button"
        >
          <UserRound />
          <div className="sidebar__btn-title">Profile</div>
        </a>

        <a
          href=""
          className="btn sidebar__btn"
          aria-label="direct-message-page-button"
        >
          <UserRoundPlus />
          <div className="sidebar__btn-title">Follow</div>
        </a>

        <a
          href=""
          className="btn sidebar__btn"
          aria-label="direct-message-page-button"
        >
          <Heart />
          <div className="sidebar__btn-title">Liked Posts</div>
        </a>

        <a
          href=""
          className="btn sidebar__btn"
          aria-label="direct-message-page-button"
        >
          <MessageCircle />
          <div className="sidebar__btn-title">Comments</div>
        </a>

        <a
          href=""
          className="btn sidebar__btn"
          aria-label="direct-message-page-button"
        >
          <Settings />
          <div className="sidebar__btn-title">Settings</div>
        </a>

        <button
          className="btn sidebar__btn"
          aria-label="direct-message-page-button"
        >
          <LogOut />
          <div className="sidebar__btn-title">Log out</div>
        </button>
      </nav>
    </div>
  );
}
