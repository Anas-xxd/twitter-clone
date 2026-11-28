import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Main from "../../src/components/Main/Main";

describe("Main", () => {
  it("should display a loading message while fetching posts", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );

    render(<Main />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  it("should display posts after successfully fetching them", async () => {
    const mockPosts = [
      {
        author: {
          authorId: 1,
          username: "Anas_xxd",
          firstName: "Anas",
          lastName: "Baroudi",
          avatarUrl: "/avatar.svg",
        },
        post: {
          postId: 1,
          textContent: "Test post!",
          mediaUrl: "",
          createdAt: "2026-11-25T07:00:00.000Z",
          engagement: {
            likesCount: 5,
            repostsCount: 2,
            commentsCount: 3,
            isLiked: false,
            isReposted: false,
          },
        },
      },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      }),
    );

    render(<Main />);

    expect(await screen.findByText("Test post!")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  it("should display an error message when fetching posts fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error")),
    );

    render(<Main />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Failed to load posts. Please try again.",
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();

    vi.unstubAllGlobals();
  });
});
