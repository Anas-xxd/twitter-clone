import PostComposer from "./PostComposer";
import Feed from "./Feed";
import getPosts from "../../data/postService";
import "./Main.css";
import { useState, useEffect } from "react";

export default function Main() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch {
        setError("Failed to load posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div role="alert">{error}</div>;
  }

  return (
    <main>
      <PostComposer setPosts={setPosts} />
      <Feed posts={posts} />
    </main>
  );
}
