import avatar from "../assets/avatar.svg";
import postImg from "../assets/content-placeholder.png";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";

export default function Post() {
  return (
    <article className="post">
      <img className="avatar" src={avatar} alt="Avatar" />

      <div className="post-content">
        <p className="user-info">
          Username <span>@user . Aug 26</span>
        </p>

        <p className="content"> Today I am so lazy</p>

        <img className="img-post" src={postImg} alt="Image Post" />

        <div className="post-interactions">
          <button className="btn interaction-btn" aria-label="Reply">
            <MessageCircle />
          </button>

          <button className="btn interaction-btn" aria-label="Repost">
            <Repeat2 />
          </button>

          <button className="btn interaction-btn" aria-label="Like">
            <Heart />
          </button>
        </div>
      </div>
    </article>
  );
}
