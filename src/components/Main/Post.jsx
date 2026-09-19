import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useState } from "react";
import { formatPostDate } from "../../utils/formatPostDate";

export default function Post({ postData }) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  const { userInfo, postInfo } = postData;
  const { userId, name, username, avatar } = userInfo;
  const { postId, content, img, createdAt, postInteractions } = postInfo;
  const {
    likesNum,
    isLiked,
    repostNum,
    isReposted,
    commentsNum,
    commentsList,
  } = postInteractions;

  const likeClicked = () => {
    setLiked(!liked);
    liked ? postInteractions.likesNum-- : postInteractions.likesNum++;
  };

  const repostClicked = () => {
    setReposted(!reposted);
    reposted ? postInteractions.repostNum-- : postInteractions.repostNum++;
  };

  const replyClicked = () => {
    console.log("Comments opens");
  };

  return (
    <article className="post">
      <div className="avatar-container">
        <a href="" className="btn account-btn">
          <img className="avatar" src={avatar} alt="Avatar" />
        </a>
      </div>

      <div className="post-content">
        <p className="user-info">
          {name + " "}
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
            <span className="interaction-count">{commentsNum}</span>
          </button>

          <button
            className="btn repost interaction-btn"
            aria-label="Repost"
            onClick={repostClicked}
          >
            <Repeat2 color={reposted ? "#00ab7c" : "currentColor"} />
            <span className="interaction-count">{repostNum}</span>
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
            <span className="interaction-count">{likesNum}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
