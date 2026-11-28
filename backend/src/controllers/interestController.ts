import { pool } from "../database/database";

import type { Request, Response } from "express";
import type { InterestRow, InterestPublicResponse } from "../types/interest";
// About users and posts thourgh intrests
export async function getInterests(req: Request, res: Response) {
  const interests: InterestPublicResponse[] =
    await getPublicInterestsResponse();
  return res.json(interests);
}

export async function getInterestsById(req: Request, res: Response) {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({
      error: { message: "Invalid interest ID" },
    });
  }

  const interests = await getPublicInterestsResponseById(id);

  return res.json(interests);
}

async function getPublicInterestsResponse(): Promise<InterestPublicResponse[]> {
  const results = await pool.query<InterestPublicResponse>(
    `
        SELECT id, name, description
        FROM interests
    `,
  );

  return results.rows;
}

async function getPublicInterestsResponseById(
  id: string,
): Promise<InterestPublicResponse> {
  const results = await pool.query<InterestPublicResponse>(
    `
        SELECT id, name, description
        FROM interests
        WHERE id = $1
    `,
    [id],
  );

  return results.rows[0];
}
