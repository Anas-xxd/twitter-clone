import avatar from "/avatar.svg";
import {
  Heart,
  MessageCircle,
  UserRound,
  UserRoundPlus,
  Settings,
  LogOut,
} from "lucide-react";

export default function SideBar({ showSideBar, toggleSidebar }) {
  return (
    <>
      <div
        className={`gray-background 
          ${showSideBar ? "side-bar-visible" : "side-bar-invisible"}`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`side-bar ${showSideBar ? "side-bar-visible" : " side-bar-invisible"}`}
      >
        <div className="user-info">
          <a href="" className="btn account-btn">
            <img className="avatar" src={avatar} alt="Avatar" />
          </a>
          <p className="username">Username</p>
          <p className="user-handle">@Username</p>

          <div className="follow-container">
            <a href="" className="follow-info">
              <p className="follow-count">0</p>
              <p className="follow-title">Following</p>
            </a>

            <a href="" className="follow-info">
              <p className="follow-count">0</p>
              <p className="follow-title">Followers</p>
            </a>
          </div>
        </div>

        <div className="side-bar-btn-container">
          <a className="btn side-bar-btn">
            <UserRound />
            <div className="btn-title">Profile</div>
          </a>

          <a className="btn side-bar-btn">
            <UserRoundPlus />
            <div className="btn-title">Follow</div>
          </a>

          <a className="btn side-bar-btn">
            <Heart />
            <div className="btn-title">Liked Posts</div>
          </a>

          <a className="btn side-bar-btn">
            <MessageCircle />
            <div className="btn-title">Comments</div>
          </a>

          <a className="btn side-bar-btn">
            <Settings />
            <div className="btn-title">Settings</div>
          </a>

          <button className="btn log-out-btn side-bar-btn">
            <LogOut />
            <div className="btn-title">Log out</div>
          </button>
        </div>
      </div>
    </>
  );
}
