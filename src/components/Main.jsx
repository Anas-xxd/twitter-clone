import FeedTypeTab from "./FeedTypeTabs";
import PostingSection from "./PostingSection";
import FeedSection from "./FeedSection";
import { useState } from "react";

export default function Main() {
  const [posts, setPosts] = useState([]);

  return (
    <main>
      <FeedTypeTab />
      <PostingSection setPosts={setPosts} />
      <FeedSection posts={posts} />
    </main>
  );
}
