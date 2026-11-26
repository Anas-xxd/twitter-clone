import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import { pool } from "../../src/database/database";
import {
  getInterests,
  getInterestsById,
} from "../../src/controllers/interestController";

vi.mock("../../src/database/database", () => ({
  pool: {
    query: vi.fn(),
  },
}));

const mockInterests = [
  { id: 1, name: "Gaming", description: "Video games" },
  { id: 2, name: "Programming", description: "Software development" },
];

function createMockResponse() {
  return {
    json: vi.fn(),
  } as unknown as Response;
}

describe("interestController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getInterests", () => {
    it("should return all public interests", async () => {
      vi.mocked(pool.query).mockResolvedValue({
        rows: mockInterests,
      } as never);

      const res = createMockResponse();

      await getInterests({} as Request, res);

      expect(pool.query).toHaveBeenCalledOnce();
      expect(res.json).toHaveBeenCalledWith(mockInterests);
    });
  });

  describe("getInterestsById", () => {
    it("should return the interest matching the requested ID", async () => {
      vi.mocked(pool.query).mockResolvedValue({
        rows: [mockInterests[1]],
      } as never);

      const req = {
        params: { id: "2" },
      } as unknown as Request;

      const res = createMockResponse();

      await getInterestsById(req, res);

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining("WHERE id = $1"),
        ["2"],
      );

      expect(res.json).toHaveBeenCalledWith(mockInterests[1]);
    });
  });
});
