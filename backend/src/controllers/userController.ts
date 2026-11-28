import { pool } from "../database/database";

import type { Request, Response } from "express";
import type { UserResponse, UserPublicResponse } from "../types/user";

export async function getUserById(req: Request, res: Response) {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({
      error: { message: "Invalid user ID" },
    });
  }

  const user: UserPublicResponse = await getUserPublicResponse(id);

  return res.json(user);
}

async function getUserResponse(userId: string): Promise<UserResponse> {
  const result = await pool.query<UserResponse>(``);

  return result.rows[0];
}

async function getUserPublicResponse(
  userId: string,
): Promise<UserPublicResponse> {
  const result = await pool.query<UserPublicResponse>(
    `
        SELECT u.username, u.first_name, u.last_name, u.bio, u.birthdate, 
            u.avatar_url, u.banner_url, u.created_at,

        (
            SELECT COUNT(*)
            FROM follows f
            WHERE f.following_id = u.id
        ) AS followers_count,

        (
            SELECT COUNT(*)
            FROM follows f
            WHERE f.follower_id = u.id
        ) AS following_count

        FROM users u

        WHERE u.id = $1
        `,
    [userId],
  );

  return result.rows[0];
}
