import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "../../src/components/Header/Header";
import { useVisibility } from "../../src/hooks/useVisibility";

vi.mock("../../src/hooks/useVisibility", () => ({
  useVisibility: vi.fn(),
}));

describe("Header", () => {
  it("should render the logo, avatar, and feed tabs", () => {
    vi.mocked(useVisibility).mockReturnValue(true);

    render(<Header toggleSidebar={vi.fn()} />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Avatar")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "For you" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Following" })).toBeInTheDocument();
  });

  it("should call toggleSidebar when the menu button is clicked", async () => {
    vi.mocked(useVisibility).mockReturnValue(true);

    const user = userEvent.setup();
    const toggleSidebar = vi.fn();

    render(<Header toggleSidebar={toggleSidebar} />);

    await user.click(screen.getByRole("button", { name: "open sidebar" }));

    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("should hide the header when it is not visible", () => {
    vi.mocked(useVisibility).mockReturnValue(false);

    const { container } = render(<Header toggleSidebar={vi.fn()} />);

    expect(container.querySelector("header")).toHaveClass("hidden");
  });
});
