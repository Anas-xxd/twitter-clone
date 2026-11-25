import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "../../src/components/Footer/Footer";
import { useVisibility } from "../../src/hooks/useVisibility";

vi.mock("../../src/hooks/useVisibility", () => ({
  useVisibility: vi.fn(),
}));

describe("Footer", () => {
  it("should render all navigation buttons", () => {
    vi.mocked(useVisibility).mockReturnValue(true);

    render(<Footer />);

    expect(screen.getByLabelText("Home-page-button")).toBeInTheDocument();
    expect(screen.getByLabelText("Search-page-button")).toBeInTheDocument();
    expect(
      screen.getByLabelText("notification-page-button"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("direct-message-page-button"),
    ).toBeInTheDocument();
  });

  it("should mark Home as the current page", () => {
    vi.mocked(useVisibility).mockReturnValue(true);

    render(<Footer />);

    expect(screen.getByLabelText("Home-page-button")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("should hide the footer when it is not visible", () => {
    vi.mocked(useVisibility).mockReturnValue(false);

    const { container } = render(<Footer />);

    expect(container.querySelector("footer")).toHaveClass("hidden");
  });
});
