import logo from "./assets/logo.svg";
import avatar from "./assets/avatar.svg";
import postImg from "./assets/content-placeholder.png";
import {
  Menu,
  Heart,
  Repeat2,
  House,
  Search,
  Bell,
  MessageCircle,
} from "lucide-react";

export default function App() {
  return (
    <>
      <header>
        <button className="btn menu-btn">
          <Menu />
        </button>

        <div className="logo-container">
          <img src={logo} id="logo" alt="Logo" />
        </div>

        <button className="btn account-btn">
          <img className="avatar" src={avatar} alt="Avatar" />
        </button>
      </header>

      <main>
        <div className="feed-type-tablist" role="tablist">
          <button className="btn tab-btn" role="tab" aria-selected="true">
            For you
          </button>
          <button className="btn tab-btn" role="tab" aria-selected="false">
            Following
          </button>
        </div>

        <form className="post-section">
          <img className="avatar" src={avatar} alt="Avatar" />

          <div className="post-text-area">
            <textarea
              className="text-area"
              placeholder="What's happening?"
            ></textarea>
            <button className="post-btn" type="submit">
              Post
            </button>
          </div>
        </form>

        <section className="feed-section">
          <article className="post">
            <img className="avatar" src={avatar} alt="Avatar" />

            <div className="post-content">
              <p className="user-info">
                Username <span>@user . Aug 26</span>
              </p>

              <p className="content"> today I am so lazy</p>

              <img className="img-post" src={postImg} alt="Image Post" />

              <div className="post-interactions">
                <button className="btn interaction-btn" aria-label="Like">
                  <Heart />
                </button>

                <button className="btn interaction-btn" aria-label="Reply">
                  <MessageCircle />
                </button>

                <button className="btn interaction-btn" aria-label="Repost">
                  <Repeat2 />
                </button>
              </div>
            </div>
          </article>
        </section>
      </main>

      <footer>
        <nav className="main-nav" aria-label="Primary">
          <a
            href=""
            className="btn nav-btn"
            aria-label="Home-page-button"
            aria-current="page"
          >
            <House />
          </a>

          <a href="" className="btn nav-btn" aria-label="Search-page-button">
            <Search />
          </a>

          <a
            href=""
            className="btn nav-btn"
            aria-label="notification-page-button"
          >
            <Bell />
          </a>

          <a
            href=""
            className="btn nav-btn"
            aria-label="direct-message-page-button"
          >
            <MessageCircle />
          </a>
        </nav>
      </footer>
    </>
  );
}
