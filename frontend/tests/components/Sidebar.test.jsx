import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Sidebar from "../../src/components/Sidebar/Sidebar";
import userEvent from "@testing-library/user-event";

describe("Sidebar", () => {
  it("should render the user information and navigation links", () => {
    render(<Sidebar showSidebar={false} toggleSidebar={vi.fn()} />);

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("@Username")).toBeInTheDocument();

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Follow")).toBeInTheDocument();
    expect(screen.getByText("Liked Posts")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("should apply the visible class when showSidebar is true", () => {
    const { container } = render(
      <Sidebar showSidebar={true} toggleSidebar={vi.fn()} />,
    );

    expect(container.querySelector(".sidebar")).toHaveClass("visible");
    expect(container.querySelector(".sidebar-overlay")).toHaveClass("visible");
  });

  it("should not apply the visible class when showSidebar is false", () => {
    const { container } = render(
      <Sidebar showSidebar={false} toggleSidebar={vi.fn()} />,
    );

    expect(container.querySelector(".sidebar")).not.toHaveClass("visible");
    expect(container.querySelector(".sidebar-overlay")).not.toHaveClass(
      "visible",
    );
  });

  it("should call toggleSidebar when the overlay is clicked", async () => {
    const user = userEvent.setup();
    const toggleSidebar = vi.fn();

    const { container } = render(
      <Sidebar showSidebar={true} toggleSidebar={toggleSidebar} />,
    );

    await user.click(container.querySelector(".sidebar-overlay"));

    expect(toggleSidebar).toHaveBeenCalledOnce();
  });
});
