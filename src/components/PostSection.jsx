import avatar from "./assets/avatar.svg";

export default function PostSection() {
  return (
    <form className="post-section">
      <img className="avatar" src={avatar} alt="Avatar" />

      <div className="post-text-area">
        <textarea
          className="text-area"
          placeholder="What's happening?"
        ></textarea>
        <button className="text-area" type="submit">
          Post
        </button>
      </div>
    </form>
  );
}
