import express from "express";
import request from "supertest";
import interestRouter from "../../src/routes/interestRouter";
import { describe, it, expect, vi } from "vitest";
import type { Request, Response } from "express";
import {
  getInterests,
  getInterestsById,
} from "../../src/controllers/interestController";

vi.mock("../../src/controllers/interestController", () => ({
  getInterests: vi.fn((_req: Request, res: Response) => {
    res.status(200).json({ message: "All interests" });
  }),
  getInterestsById: vi.fn((req: Request, res: Response) => {
    res.status(200).json({ id: req.params.id });
  }),
}));

describe("interestRouter", () => {
  const app = express();
  app.use("/interests", interestRouter);

  it("should call getInterests for GET /", async () => {
    const response = await request(app).get("/interests");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "All interests" });
    expect(getInterests).toHaveBeenCalledOnce();
  });

  it("should call getInterestsById for GET /:id", async () => {
    const response = await request(app).get("/interests/5");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: "5" });
    expect(getInterestsById).toHaveBeenCalledOnce();
  });
});
