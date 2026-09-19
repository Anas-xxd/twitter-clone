import PostingSection from "./PostingSection";
import FeedSection from "./FeedSection";
import getPosts from "../../data/postService";
import "./Main.css";
import { useState, useEffect } from "react";

export default function Main() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPosts();
      setPosts(postsData);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main>
      <PostingSection setPosts={setPosts} />
      <FeedSection posts={posts} />
    </main>
  );
}
