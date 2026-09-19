import { useState } from "react";

export default function PostingSection({ setPosts }) {
  const [postText, setPostText] = useState("");

  function handleSubmetting(e) {
    e.preventDefault();
    if (!postText.trim()) {
      return;
    }
    setPosts((prevPosts) => [
      {
        userInfo: {
          userId: 1,
          name: "Anas Baroudi",
          username: "Anas_xxd",
          avatar: "/avatar.svg",
        },
        postInfo: {
          postId: Date.now(),
          content: postText,
          createdAt: new Date().toISOString(),
          postInteractions: {
            likesNum: 0,
            isLiked: false,
            repostNum: 0,
            isReposted: false,
            commentsNum: 0,
            commentsList: [],
          },
        },
      },
      ...prevPosts,
    ]);
    setPostText("");
  }

  return (
    <form className="post-section" onSubmit={handleSubmetting}>
      <div className="avatar-container">
        <a href="" className="btn account-btn">
          <img className="avatar" src="/avatar.svg" alt="Avatar" />
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
          className={`post-btn ${postText.trim() ? "active" : ""}`}
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
}
