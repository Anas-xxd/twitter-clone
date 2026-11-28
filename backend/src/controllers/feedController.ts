import { pool } from "../database/database";
import { mapResponse } from "../mappers/postMapper";

import type { Request, Response } from "express";
import type { PostResponse, PostFeedRow } from "../types/post";

export async function getFeed(req: Request, res: Response) {
  const forYouFeed: PostFeedRow[] = await getForYouFeed("1");
  const response: PostResponse[] = mapResponse(forYouFeed);
  return res.json(response);
}

async function getFollowingFeed(
  userId: string,
  lastPostDate?: Date,
  lastPostId?: number,
): Promise<PostFeedRow[]> {
  const results = await pool.query<PostFeedRow>(
    `
    SELECT p.id, p.user_id, p.text_content, p.media_url, p.likes_count, 
      p.reposts_count, p.comments_count, p.created_at,
      u.username, u.first_name, u.last_name, u.avatar_url,

      EXISTS (
        SELECT 1
        FROM likes l
        WHERE l.user_id = $1
          AND l.post_id = p.id
      ) AS is_liked,
  
      EXISTS (
        SELECT 1
        FROM reposts r
        WHERE r.user_id = $1
          AND r.post_id = p.id
      ) AS is_reposted,

      p.user_id <> $1 AS is_following

    FROM posts p
    JOIN users u 
      ON p.user_id = u.id
    
    WHERE
      p.parent_post_id IS NULL
      AND (
        p.user_id = $1
        OR EXISTS (
          SELECT 1
          FROM follows f
          WHERE f.follower_id = $1
            AND f.following_id = p.user_id
        )
      )
      AND ($2::TIMESTAMPTZ IS NULL OR (p.created_at, p.id) < ($2, $3))

    ORDER BY p.created_at DESC, p.id DESC
      
    LIMIT 20;
    `,
    [userId, lastPostDate, lastPostId],
  );

  return results.rows;
}

async function getForYouFeed(userId: string): Promise<PostFeedRow[]> {
  const results = await pool.query<PostFeedRow>(
    `
    SELECT p.id, p.user_id, p.text_content, p.media_url, p.likes_count, 
      p.reposts_count, p.comments_count, p.created_at,
      u.username, u.first_name, u.last_name, u.avatar_url,

      EXISTS (
        SELECT 1
        FROM likes l
        WHERE l.user_id = $1
          AND l.post_id = p.id
      ) AS is_liked,
  
      EXISTS (
        SELECT 1
        FROM reposts r
        WHERE r.user_id = $1
          AND r.post_id = p.id
      ) AS is_reposted,

      p.user_id <> $1 AS is_following

    FROM posts p
    JOIN users u 
      ON p.user_id = u.id

    ORDER BY p.created_at DESC, p.id DESC
      
    LIMIT 20;
    `,
    [userId],
  );

  return results.rows;
}
