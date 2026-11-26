import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import { pool } from "../../src/database/database";
import { getUserById } from "../../src/controllers/userController";

vi.mock("../../src/database/database", () => ({
  pool: {
    query: vi.fn(),
  },
}));

const mockUser = {
  username: "test_user",
  first_name: "Test",
  last_name: "User",
  bio: "A test account",
  birthdate: "2000-01-01",
  avatar_url: "/avatar.svg",
  banner_url: "/banner.svg",
  created_at: "2026-01-01",
  followers_count: 10,
  following_count: 5,
};

function createMockResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response;
}

describe("userController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the public user information", async () => {
    vi.mocked(pool.query).mockResolvedValue({
      rows: [mockUser],
    } as never);

    const req = {
      params: { id: "5" },
    } as unknown as Request;

    const res = createMockResponse();

    await getUserById(req, res);

    expect(pool.query).toHaveBeenCalledOnce();
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("WHERE u.id = $1"),
      ["5"],
    );
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should return 400 when the ID is invalid", async () => {
    const req = {
      params: { id: ["5"] },
    } as unknown as Request;

    const res = createMockResponse();

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: { message: "Invalid user ID" },
    });
    expect(pool.query).not.toHaveBeenCalled();
  });
});
