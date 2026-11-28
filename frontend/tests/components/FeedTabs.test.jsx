import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FeedTypeTab from "../../src/components/Header/FeedTabs";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("FeedTypeTab", () => {
  it("should render both feed tabs", () => {
    render(<FeedTypeTab />);

    expect(screen.getByRole("tab", { name: "For you" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Following" })).toBeInTheDocument();
  });

  it("should select For you by default", () => {
    render(<FeedTypeTab />);

    expect(screen.getByRole("tab", { name: "For you" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    expect(screen.getByRole("tab", { name: "Following" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("should switch the active tab when clicked", async () => {
    const user = userEvent.setup();

    render(<FeedTypeTab />);

    await user.click(screen.getByRole("tab", { name: "Following" }));

    expect(screen.getByRole("tab", { name: "Following" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    expect(screen.getByRole("tab", { name: "For you" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });
});
