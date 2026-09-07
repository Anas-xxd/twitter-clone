import PostingSection from "./PostingSection";
import FeedSection from "./FeedSection";
import { useState } from "react";

export default function Main() {
  const [posts, setPosts] = useState([]);

  return (
    <main>
      <PostingSection setPosts={setPosts} />
      <FeedSection posts={posts} />
    </main>
  );
}
