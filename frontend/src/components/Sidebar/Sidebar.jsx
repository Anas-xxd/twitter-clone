import "./Sidebar.css";
import {
  Heart,
  MessageCircle,
  UserRound,
  UserRoundPlus,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar({ showSidebar, toggleSidebar }) {
  return (
    <>
      <div
        className={`sidebar-overlay 
          ${showSidebar ? "visible" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <div className={`sidebar ${showSidebar ? "visible" : ""}`}>
        <div className="sidebar__user-info">
          <a href="" className="btn account-btn">
            <img className="avatar" src="/avatar.svg" alt="Avatar" />
          </a>
          <p className="sidebar__username">Username</p>
          <p className="sidebar__user-handle">@Username</p>

          <div className="sidebar__follow-container">
            <a href="" className="sidebar__follow-info">
              <p className="sidebar__follow-count">0</p>
              <p className="sidebar__follow-title">Following</p>
            </a>

            <a href="" className="sidebar__follow-info">
              <p className="sidebar__follow-count">0</p>
              <p className="sidebar__follow-title">Followers</p>
            </a>
          </div>
        </div>

        <div className="sidebar__nav">
          <a className="btn sidebar__btn">
            <UserRound />
            <div className="sidebar__btn-title">Profile</div>
          </a>

          <a className="btn sidebar__btn">
            <UserRoundPlus />
            <div className="sidebar__btn-title">Follow</div>
          </a>

          <a className="btn sidebar__btn">
            <Heart />
            <div className="sidebar__btn-title">Liked Posts</div>
          </a>

          <a className="btn sidebar__btn">
            <MessageCircle />
            <div className="sidebar__btn-title">Comments</div>
          </a>

          <a className="btn sidebar__btn">
            <Settings />
            <div className="sidebar__btn-title">Settings</div>
          </a>

          <button className="btn sidebar__btn sidebar__log-out-btn">
            <LogOut />
            <div className="sidebar__btn-title">Log out</div>
          </button>
        </div>
      </div>
    </>
  );
}
