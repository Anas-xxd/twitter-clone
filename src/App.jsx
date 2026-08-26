export default function App() {
  return (
    <>
      <header>
        <button className="menu-btn">
          <svg className="icon"></svg>
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
          <button>Post</button>
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
                <svg className="icon"></svg>
              </button>

              <button className="interaction-btn" aria-label="Reply">
                <svg className="icon"></svg>
              </button>

              <button className="interaction-btn" aria-label="Repost">
                <svg className="icon"></svg>
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
            <svg className="icon"></svg>
          </a>

          <a href="" className="nav-btn" aria-label="Search-page-button">
            <svg className="icon"></svg>
          </a>

          <a href="" className="nav-btn" aria-label="notification-page-button">
            <svg className="icon"></svg>
          </a>

          <a
            href=""
            className="nav-btn"
            aria-label="direct-message-page-button"
          >
            <svg className="icon"></svg>
          </a>
        </nav>
      </footer>
    </>
  );
}
