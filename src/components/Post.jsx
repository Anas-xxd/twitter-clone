import avatar from "../assets/avatar.svg";
import postImg from "../assets/content-placeholder.png";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useState } from "react";

export default function Post() {
  const [liked, isLiked] = useState(false);
  const [reposted, isReposted] = useState(false);

  function likeClicked() {
    liked ? isLiked(false) : isLiked(true);
  }

  function repostClicked() {
    reposted ? isReposted(false) : isReposted(true);
  }

  function replyClicked() {
    console.log("Comments opens");
  }

  return (
    <article className="post">
      <div className="avatar-container">
        <a href="" className="btn account-btn">
          <img className="avatar" src={avatar} alt="Avatar" />
        </a>
      </div>

      <div className="post-content">
        <p className="user-info">
          Username <span>@user . Aug 26</span>
        </p>

        <p className="content"> Today I am so lazy</p>

        <img className="img-post" src={postImg} alt="Image Post" />

        <div className="post-interactions">
          <button
            className="btn reply interaction-btn"
            aria-label="Reply"
            onClick={replyClicked}
          >
            <MessageCircle />
          </button>

          <button
            className="btn repost interaction-btn"
            aria-label="Repost"
            onClick={repostClicked}
          >
            <Repeat2 color={reposted ? "#00ab7c" : "currentColor"} />
          </button>

          <button
            className="btn like interaction-btn"
            aria-label="Like"
            onClick={likeClicked}
          >
            <Heart
              color={liked ? "#f91880" : "currentColor"}
              fill={liked ? "#f91880" : "none"}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
