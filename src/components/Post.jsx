import { Heart, MessageCircle, Repeat2 } from "lucide-react";

export default function Post() {
  return (
    <article className="post">
      <img className="avatar" src="" alt="" />

      <div className="post-content">
        <p className="user-info">Username @user date</p>

        <p className="content"> today I am so lazy</p>

        <div className="post-interactions">
          <button className="interaction-btn" aria-label="Like">
            <Heart />
          </button>

          <button className="interaction-btn" aria-label="Reply">
            <MessageCircle />
          </button>

          <button className="interaction-btn" aria-label="Repost">
            <Repeat2 />
          </button>
        </div>
      </div>
    </article>
  );
}
