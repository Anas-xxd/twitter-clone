import { useState } from "react";

export default function FeedTypeTab() {
  const [activeTab, setActiveTab] = useState("forYou");

  return (
    <div className="feed-tablist" role="tablist">
      <button
        className="btn feed-tablist__btn"
        role="tab"
        aria-selected={activeTab === "forYou"}
        onClick={() => setActiveTab("forYou")}
      >
        <div
          className={`feed-tablist__label ${
            activeTab === "forYou" ? "feed-tablist--active" : ""
          }`}
        >
          For you
        </div>
      </button>

      <button
        className="btn feed-tablist__btn"
        role="tab"
        aria-selected={activeTab === "following"}
        onClick={() => setActiveTab("following")}
      >
        <div
          className={`feed-tablist__label ${
            activeTab === "following" ? "feed-tablist--active" : ""
          }`}
        >
          Following
        </div>
      </button>
    </div>
  );
}
