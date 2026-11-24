import request from "supertest";
import app from "./app";
import { describe, it, expect, vi } from "vitest";
import { pool } from "./database/database";

describe("GET /api/health", () => {
  it("should return 200 and confirm the server is running", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Server is running!",
    });
  });
});

vi.mock("./database/database", () => ({
  pool: {
    query: vi.fn(),
  },
}));

describe("GET /api/ready", () => {
  it("should return 200 when the database is connected", async () => {
    vi.mocked(pool.query).mockResolvedValueOnce({
      rows: [{ "?column?": 1 }],
    } as never);

    const response = await request(app).get("/api/ready");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "healthy",
      database: "connected",
    });
  });

  it("should return 503 when the database is disconnected", async () => {
    vi.mocked(pool.query).mockRejectedValueOnce(
      new Error("Database connection failed"),
    );

    const response = await request(app).get("/api/ready");

    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      status: "unhealthy",
      database: "disconnected",
    });
  });
});
