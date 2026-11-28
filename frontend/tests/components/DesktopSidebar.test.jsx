import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DesktopSidebar from "../../src/components/Sidebar/DesktopSidebar";

describe("DesktopSidebar", () => {
  it("should render the logo and navigation links", () => {
    render(<DesktopSidebar />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();

    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Follow")).toBeInTheDocument();
    expect(screen.getByText("Liked Posts")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("should mark Home as the current page", () => {
    render(<DesktopSidebar />);

    expect(screen.getByLabelText("Home-page-button")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
