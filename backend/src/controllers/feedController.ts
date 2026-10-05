import { Request, Response } from "express";

export function getFeed(req: Request, res: Response) {
  const feed: { [key: string]: number } = { feed1: 1, feed2: 2, Feed3: 3 };
  return res.json(feed);
}
