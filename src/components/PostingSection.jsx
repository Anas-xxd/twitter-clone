import { useState } from "react";
import avatar from "/avatar.svg";

export default function PostingSection({ setPosts }) {
  const [postText, setPostText] = useState("");

  function handleSubmetting(e) {
    e.preventDefault();
    if (!postText.trim()) {
      return;
    }
    setPosts((prevPosts) => [
      {
        id: Date.now(),
        text: postText,
        date: new Date().toLocaleDateString(),
      },
      ...prevPosts,
    ]);
    setPostText("");
  }

  return (
    <form className="post-section" onSubmit={handleSubmetting}>
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
          className={postText.trim() ? "post-btn active" : "post-btn"}
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
}
