import Post from "./Post";

export default function FeedSection({ posts }) {
  return (
    <section className="feed-section">
      {posts.map((post) => (
        <Post postData={post} />
      ))}
    </section>
  );
}
