import { useState } from "react";

export default function FeedTypeTab() {
  const [activeTab, setActiveTab] = useState("forYou");

  return (
    <div className="feed-type-tablist" role="tablist">
      <button
        className="btn tab-btn"
        role="tab"
        aria-selected={activeTab === "forYou"}
        onClick={() => setActiveTab("forYou")}
      >
        <div
          className={
            activeTab === "forYou"
              ? "tab-text-container active-tab"
              : "tab-text-container"
          }
        >
          For you
        </div>
      </button>

      <button
        className="btn tab-btn"
        role="tab"
        aria-selected={activeTab === "following"}
        onClick={() => setActiveTab("following")}
      >
        <div
          className={
            activeTab === "following"
              ? "tab-text-container active-tab"
              : "tab-text-container"
          }
        >
          Following
        </div>
      </button>
    </div>
  );
}
