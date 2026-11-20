import { Request, Response } from "express";
import data from "../database/data.json";

export function getFeed(req: Request, res: Response) {
  return res.json(data);
}
