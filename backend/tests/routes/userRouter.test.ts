import express from "express";
import request from "supertest";
import userRouter from "../../src/routes/userRouter";
import { describe, it, expect, vi } from "vitest";
import type { Request, Response } from "express";
import { getUserById } from "../../src/controllers/userController";

vi.mock("../../src/controllers/userController", () => ({
  getUserById: vi.fn((req: Request, res: Response) => {
    res.status(200).json({ id: req.params.id });
  }),
}));

describe("userRouter", () => {
  const app = express();
  app.use("/users", userRouter);

  it("should call getUserById for GET /:id", async () => {
    const response = await request(app).get("/users/5");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: "5" });
    expect(getUserById).toHaveBeenCalledOnce();
  });
});
