import { useState } from "react";
import avatar from "../assets/avatar.svg";

export default function PostSection() {
  const [postText, setPostText] = useState("");
  return (
    <form className="post-section">
      <div className="avatar-container">
        <a href="" className="btn account-btn">
          <img className="avatar" src={avatar} alt="Avatar" />
        </a>
      </div>

      <div className="post-text-area">
        <textarea
          className="text-area"
          placeholder="What's happening?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
        <button
          className={postText ? "post-btn active" : "post-btn"}
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
}
