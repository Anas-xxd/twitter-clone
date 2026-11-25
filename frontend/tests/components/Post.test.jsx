const mockPost = {
  author: {
    authorId: 1,
    username: "Anas_xxd",
    firstName: "Anas",
    lastName: "Baroudi",
    avatarUrl: "/avatar.svg",
  },
  post: {
    postId: 1,
    textContent: "Hello world!",
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
};

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import Post from "../../src/components/Main/Post";
import "@testing-library/jest-dom/vitest";

describe("Post", () => {
  it("should render the author's information and post content", () => {
    render(<Post postData={mockPost} />);

    expect(screen.getByText("Anas Baroudi")).toBeInTheDocument();
    expect(screen.getByText(/@Anas_xxd/)).toBeInTheDocument();
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
  });

  it("should render the initial engagement counts", () => {
    render(<Post postData={mockPost} />);

    expect(screen.getByRole("button", { name: "Reply" })).toHaveTextContent(
      "3",
    );
    expect(screen.getByRole("button", { name: "Repost" })).toHaveTextContent(
      "2",
    );
    expect(screen.getByRole("button", { name: "Like" })).toHaveTextContent("5");
  });

  it("should increase the like count when liked", async () => {
    const user = userEvent.setup();

    render(<Post postData={mockPost} />);

    await user.click(screen.getByRole("button", { name: "Like" }));

    expect(screen.getByRole("button", { name: "Like" })).toHaveTextContent("6");
  });

  it("should decrease the like count when unliked", async () => {
    const user = userEvent.setup();

    render(<Post postData={mockPost} />);

    const likeButton = screen.getByRole("button", { name: "Like" });

    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeButton).toHaveTextContent("5");
  });

  it("should increase the repost count when reposted", async () => {
    const user = userEvent.setup();

    render(<Post postData={mockPost} />);

    await user.click(screen.getByRole("button", { name: "Repost" }));

    expect(screen.getByRole("button", { name: "Repost" })).toHaveTextContent(
      "3",
    );
  });

  it("should decrease the repost count when undoing a repost", async () => {
    const user = userEvent.setup();

    render(<Post postData={mockPost} />);

    const repostButton = screen.getByRole("button", { name: "Repost" });

    await user.click(repostButton);
    await user.click(repostButton);

    expect(repostButton).toHaveTextContent("2");
  });

  it("should render the media image when a media URL is provided", () => {
    const postWithMedia = {
      ...mockPost,
      post: {
        ...mockPost.post,
        mediaUrl: "/test-image.png",
      },
    };

    render(<Post postData={postWithMedia} />);

    expect(screen.getByAltText("Image Post")).toHaveAttribute(
      "src",
      "/test-image.png",
    );
  });

  it("should not render a media image when no media URL is provided", () => {
    render(<Post postData={mockPost} />);

    expect(screen.queryByAltText("Image Post")).not.toBeInTheDocument();
  });
});
