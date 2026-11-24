import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

vi.mock("../database/database", () => ({
  pool: {
    query: vi.fn(),
  },
}));

import { pool } from "../database/database";
import app from "../app";

describe("GET /api/feed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the mapped feed posts", async () => {
    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: [
        {
          id: "10",
          user_id: "1",
          text_content: "Hello world!",
          media_url: null,
          likes_count: 5,
          reposts_count: 2,
          comments_count: 3,
          created_at: new Date("2026-11-23T12:00:00Z"),
          username: "anas",
          first_name: "Anas",
          last_name: "Example",
          avatar_url: null,
          is_liked: true,
          is_reposted: false,
          is_following: false,
        },
      ],
    } as never);

    const response = await request(app).get("/api/feed");

    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      {
        author: {
          authorId: "1",
          username: "anas",
          firstName: "Anas",
          lastName: "Example",
          avatarUrl: null,
        },
        post: {
          postId: "10",
          textContent: "Hello world!",
          mediaUrl: null,
          createdAt: "2026-11-23T12:00:00.000Z",
          engagement: {
            likesCount: 5,
            repostsCount: 2,
            commentsCount: 3,
            isLiked: true,
            isReposted: false,
            isFollowing: false,
          },
        },
      },
    ]);

    expect(pool.query).toHaveBeenCalledOnce();
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("FROM posts p"),
      ["1"],
    );
  });
});

it("should return 500 when the database query fails", async () => {
  vi.mocked(pool.query).mockRejectedValueOnce(
    new Error("Database connection failed"),
  );

  const response = await request(app).get("/api/feed");

  expect(response.status).toBe(500);
  expect(response.body).toEqual({
    error: {
      message: "Internal server error",
    },
  });

  expect(pool.query).toHaveBeenCalledOnce();
});
