import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useState } from "react";
import { formatPostDate } from "../../utils/formatPostDate";

export default function Post({ postData }) {
  const { author, post } = postData;
  const { authorId, username, firstName, lastName, avatarUrl } = author;
  const { postId, textContent, mediaUrl, createdAt, engagement } = post;
  const { likesCount, repostsCount, commentsCount, isLiked, isReposted } =
    engagement;
  //if the parent later passes updated engagement values for the
  //same post, the local state won't automatically synchronize
  const [liked, setLiked] = useState(isLiked);
  const [reposted, setReposted] = useState(isReposted);

  const [likes, setLikes] = useState(likesCount);
  const [reposts, setReposts] = useState(repostsCount);

  const likeClicked = () => {
    setLiked((previous) => !previous);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const repostClicked = () => {
    setReposted((previous) => !previous);
    setReposts(reposted ? reposts - 1 : reposts + 1);
  };

  const replyClicked = () => {
    console.log("Comments opens");
  };

  return (
    <article className="post">
      <div className="avatar-container">
        <a href="" className="btn account-btn">
          <img
            className="avatar"
            src={avatarUrl || "/avatar.svg"}
            alt="Avatar"
          />
        </a>
      </div>

      <div className="post__content">
        <p className="post__user-info">
          {`${firstName} ${lastName} `}
          <span className="post__meta">
            @{username} . {formatPostDate(createdAt)}
          </span>
        </p>

        <p className="post__text">{textContent}</p>

        {mediaUrl && (
          <img className="post__media" src={mediaUrl} alt="Image Post" />
        )}

        <div className="post__interactions">
          <button
            className="btn post__interaction-btn --reply"
            aria-label="Reply"
            onClick={replyClicked}
          >
            <MessageCircle />
            <span className="post__interaction-count">{commentsCount}</span>
          </button>

          <button
            className="btn post__interaction-btn --repost"
            aria-label="Repost"
            onClick={repostClicked}
          >
            <Repeat2 color={reposted ? "#00ab7c" : "currentColor"} />
            <span className="post__interaction-count">{reposts}</span>
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
            <span className="post__interaction-count">{likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
