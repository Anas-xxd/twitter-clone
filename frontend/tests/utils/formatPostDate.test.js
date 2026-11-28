import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatPostDate } from "../../src/utils/formatPostDate";

describe("formatPostDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 25, 12, 0, 30));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return seconds for posts less than a minute old", () => {
    const date = new Date(2026, 10, 25, 12, 0, 0).toISOString();

    expect(formatPostDate(date)).toBe("30s");
  });

  it("should return minutes for posts less than an hour old", () => {
    const date = new Date(2026, 10, 25, 11, 55, 30).toISOString();

    expect(formatPostDate(date)).toBe("5m");
  });

  it("should return hours for posts less than a day old", () => {
    const date = new Date(2026, 10, 25, 9, 0, 30).toISOString();

    expect(formatPostDate(date)).toBe("3h");
  });

  it("should return month and day for posts less than 30 days old", () => {
    const date = new Date(2026, 10, 15, 12, 0, 30).toISOString();

    expect(formatPostDate(date)).toBe("Nov 15");
  });

  it("should return year, month, and day for older posts", () => {
    const date = new Date(2026, 9, 1, 12, 0, 30).toISOString();

    expect(formatPostDate(date)).toBe("Oct 1, 2026");
  });

  it("should return minutes at exactly 60 seconds", () => {
    const date = new Date(2026, 10, 25, 11, 59, 30).toISOString();

    expect(formatPostDate(date)).toBe("1m");
  });

  it("should return hours at exactly 60 minutes", () => {
    const date = new Date(2026, 10, 25, 11, 0, 30).toISOString();

    expect(formatPostDate(date)).toBe("1h");
  });

  it("should return a calendar date at exactly 24 hours", () => {
    const date = new Date(2026, 10, 24, 12, 0, 30).toISOString();

    expect(formatPostDate(date)).toBe("Nov 24");
  });

  it("should return a date including the year at exactly 30 days", () => {
    const date = new Date(2026, 9, 26, 12, 0, 30).toISOString();

    expect(formatPostDate(date)).toBe("Oct 26, 2026");
  });
});
