import Post from "./Post";

export default function Feed({ posts }) {
  return (
    <section className="feed">
      {posts.map((post) => (
        <Post key={post.post.postId} postData={post} />
      ))}
    </section>
  );
}
