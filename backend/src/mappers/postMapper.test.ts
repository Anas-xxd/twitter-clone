import { describe, it, expect } from "vitest";
import { mapResponse } from "./postMapper";
import type { PostFeedRow } from "../types/post";

describe("mapResponse", () => {
  it("should map a database post row into an API response", () => {
    const createdAt = new Date("2026-11-23T10:00:00Z");

    const row: PostFeedRow = {
      id: "1",
      user_id: "10",
      text_content: "Hello world!",
      media_url: null,
      likes_count: 5,
      reposts_count: 2,
      comments_count: 3,
      created_at: createdAt,

      username: "anas",
      first_name: "Anas",
      last_name: "Example",
      avatar_url: null,

      is_liked: true,
      is_reposted: false,
      is_following: true,
    };

    const result = mapResponse([row]);

    expect(result).toHaveLength(1);

    expect(result[0]).toEqual({
      author: {
        authorId: "10",
        username: "anas",
        firstName: "Anas",
        lastName: "Example",
        avatarUrl: null,
      },
      post: {
        postId: "1",
        textContent: "Hello world!",
        mediaUrl: null,
        createdAt,
        engagement: {
          likesCount: 5,
          repostsCount: 2,
          commentsCount: 3,
          isLiked: true,
          isReposted: false,
          isFollowing: true,
        },
      },
    });
  });

  it("should return an empty array when given no posts", () => {
    expect(mapResponse([])).toEqual([]);
  });
});
