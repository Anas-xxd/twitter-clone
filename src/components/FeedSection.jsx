import Post from "./Post";

export default function FeedSection({ posts }) {
  return (
    <section className="feed-section">
      {posts.map((post) => (
        <Post id={post.id} text={post.text} date={post.date} />
      ))}
    </section>
  );
}
