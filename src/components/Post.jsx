import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useState } from "react";
import { formatPostDate } from "../utils/formatPostDate";

export default function Post({ postData }) {
  const [liked, isLiked] = useState(false);
  const [reposted, isReposted] = useState(false);

  const { userInfo, postInfo } = postData;
  const { userId, name, username, avatar } = userInfo;
  const { postId, content, img, createdAt, postInteractions } = postInfo;

  console.log(postData);

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
          {name}{" "}
          <span>
            @{username} . {formatPostDate(createdAt)}
          </span>
        </p>

        <p className="content">{content}</p>

        {img && <img className="img-post" src={img} alt="Image Post" />}

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
