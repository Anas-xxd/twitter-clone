export default function FeedTypeTab() {
  return (
    <div className="feed-type-btn" role="tablist">
      <button className="btn tab-btn" role="tab" aria-selected="true">
        For you
      </button>
      <button className="btn tab-btn" role="tab" aria-selected="false">
        Following
      </button>
    </div>
  );
}
