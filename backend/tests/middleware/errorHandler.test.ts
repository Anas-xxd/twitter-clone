import { describe, it, expect, vi, afterEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../src/middleware/errorHandler";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("errorHandler", () => {
  it("should return a 500 response with a generic error message", () => {
    const error = new Error("Database connection failed");

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    errorHandler(error, {} as Request, res, vi.fn() as NextFunction);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: "Internal server error",
      },
    });
  });

  it("should log the original error", () => {
    const error = new Error("Database connection failed");
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    errorHandler(error, {} as Request, res, vi.fn() as NextFunction);

    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});
