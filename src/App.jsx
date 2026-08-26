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
        <button className="menu-btn">
          <Menu />
        </button>

        <div className="logo-container">
          <svg id="logo"></svg>
        </div>

        <button className="account-btn">
          <img className="avatar" src="" alt="" />
        </button>
      </header>

      <div className="feed-type-btn" role="tablist">
        <button className="for-you-btn" role="tab" aria-selected="true">
          For you
        </button>
        <button className="following-btn" role="tab" aria-selected="false">
          Following
        </button>
      </div>

      <form className="post-section">
        <img className="avatar" src="" alt="" />

        <div className="text-area">
          <textarea placeholder="What's happening?"></textarea>
          <button type="submit">Post</button>
        </div>
      </form>

      <section className="feed-section">
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
      </section>

      <footer>
        <nav aria-label="Primary">
          <a
            href=""
            className="nav-btn"
            aria-label="Home-page-button"
            aria-current="page"
          >
            <House />
          </a>

          <a href="" className="nav-btn" aria-label="Search-page-button">
            <Search />
          </a>

          <a href="" className="nav-btn" aria-label="notification-page-button">
            <Bell />
          </a>

          <a
            href=""
            className="nav-btn"
            aria-label="direct-message-page-button"
          >
            <MessageCircle />
          </a>
        </nav>
      </footer>
    </>
  );
}
