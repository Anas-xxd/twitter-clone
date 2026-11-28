import express from "express";
import request from "supertest";
import router from "../../src/routes/feedRouter";
import { describe, it, expect, vi } from "vitest";
import type { Request, Response } from "express";
import { getFeed } from "../../src/controllers/feedController";

vi.mock("../../src/controllers/feedController", () => ({
  getFeed: vi.fn((_req: Request, res: Response) => {
    res.status(200).json({ message: "Feed route reached" });
  }),
}));

describe("feedRouter", () => {
  it("should call getFeed when a GET request is made to /", async () => {
    const app = express();
    app.use("/", router);

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Feed route reached",
    });
    expect(getFeed).toHaveBeenCalledOnce();
  });
});
