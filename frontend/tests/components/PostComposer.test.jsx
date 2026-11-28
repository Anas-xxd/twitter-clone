import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import PostComposer from "../../src/components/Main/PostComposer";
import userEvent from "@testing-library/user-event";

describe("PostComposer", () => {
  it("should render the textarea and Post button", () => {
    render(<PostComposer setPosts={() => {}} />);

    expect(
      screen.getByPlaceholderText("What's happening?"),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Post" })).toBeInTheDocument();
  });

  it("should update the textarea and activate the Post button when typing", async () => {
    const user = userEvent.setup();

    render(<PostComposer setPosts={() => {}} />);

    const textarea = screen.getByPlaceholderText("What's happening?");
    const postButton = screen.getByRole("button", { name: "Post" });

    await user.type(textarea, "Hello world!");

    expect(textarea).toHaveValue("Hello world!");
    expect(postButton).toHaveClass("active");
  });

  it("should add a new post and clear the textarea when submitted", async () => {
    const user = userEvent.setup();
    const setPosts = vi.fn();

    render(<PostComposer setPosts={setPosts} />);

    const textarea = screen.getByPlaceholderText("What's happening?");

    await user.type(textarea, "Hello world!");
    await user.click(screen.getByRole("button", { name: "Post" }));

    expect(setPosts).toHaveBeenCalledOnce();

    const updatePosts = setPosts.mock.calls[0][0];
    const existingPosts = [{ id: 1 }];
    const updatedPosts = updatePosts(existingPosts);

    expect(updatedPosts).toHaveLength(2);
    expect(updatedPosts[0].post.textContent).toBe("Hello world!");
    expect(updatedPosts[1]).toBe(existingPosts[0]);

    expect(textarea).toHaveValue("");
  });

  it("should not submit an empty or whitespace-only post", async () => {
    const user = userEvent.setup();
    const setPosts = vi.fn();

    render(<PostComposer setPosts={setPosts} />);

    const textarea = screen.getByPlaceholderText("What's happening?");

    await user.type(textarea, "   ");
    await user.click(screen.getByRole("button", { name: "Post" }));

    expect(setPosts).not.toHaveBeenCalled();
    expect(textarea).toHaveValue("   ");
  });
});
