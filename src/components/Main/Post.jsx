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

      <div className="post__content">
        <p className="post__user-info">
          {name + " "}
          <span className="post__meta">
            @{username} . {formatPostDate(createdAt)}
          </span>
        </p>

        <p className="post__text">{content}</p>

        {img && <img className="post__media" src={img} alt="Image Post" />}

        <div className="post__interactions">
          <button
            className="btn post__interaction-btn --reply"
            aria-label="Reply"
            onClick={replyClicked}
          >
            <MessageCircle />
            <span className="post__interaction-count">{commentsNum}</span>
          </button>

          <button
            className="btn post__interaction-btn --repost"
            aria-label="Repost"
            onClick={repostClicked}
          >
            <Repeat2 color={reposted ? "#00ab7c" : "currentColor"} />
            <span className="post__interaction-count">{repostNum}</span>
          </button>

          <button
            className="btn post__interaction-btn --like"
            aria-label="Like"
            onClick={likeClicked}
          >
            <Heart
              color={liked ? "#f91880" : "currentColor"}
              fill={liked ? "#f91880" : "none"}
            />
            <span className="post__interaction-count">{likesNum}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
