import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Feed from "../../src/components/Main/Feed";

vi.mock("../../src/components/Main/Post", () => ({
  default: ({ postData }) => (
    <article data-testid="post">{postData.post.textContent}</article>
  ),
}));

const mockPosts = [
  {
    post: { postId: 1, textContent: "First post" },
  },
  {
    post: { postId: 2, textContent: "Second post" },
  },
];

describe("Feed", () => {
  it("should render all posts", () => {
    render(<Feed posts={mockPosts} />);

    expect(screen.getAllByTestId("post")).toHaveLength(2);
    expect(screen.getByText("First post")).toBeInTheDocument();
    expect(screen.getByText("Second post")).toBeInTheDocument();
  });

  it("should render no posts when the posts array is empty", () => {
    render(<Feed posts={[]} />);

    expect(screen.queryByTestId("post")).not.toBeInTheDocument();
  });

  it("should pass the correct post data to each Post component", () => {
    render(<Feed posts={mockPosts} />);

    expect(screen.getByText("First post")).toBeInTheDocument();
    expect(screen.getByText("Second post")).toBeInTheDocument();
  });
});
