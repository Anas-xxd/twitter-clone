import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

afterEach(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    }),
  );
});

describe("App", () => {
  it("should render the sidebar closed initially", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      }),
    );

    render(<App />);

    expect(
      screen.getByRole("button", { name: "open sidebar" }),
    ).toBeInTheDocument();

    expect(document.body).not.toHaveClass("no-scroll");
  });

  it("should open the sidebar when the menu button is clicked", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      }),
    );

    const { container } = render(<App />);

    await user.click(screen.getByRole("button", { name: "open sidebar" }));

    expect(container.querySelector(".sidebar")).toHaveClass("visible");
    expect(container.querySelector(".sidebar-overlay")).toHaveClass("visible");
    expect(document.body).toHaveClass("no-scroll");
  });

  it("should close the sidebar when the overlay is clicked", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      }),
    );

    const { container } = render(<App />);

    await user.click(screen.getByRole("button", { name: "open sidebar" }));

    await user.click(container.querySelector(".sidebar-overlay"));

    expect(container.querySelector(".sidebar")).not.toHaveClass("visible");
    expect(container.querySelector(".sidebar-overlay")).not.toHaveClass(
      "visible",
    );
    expect(document.body).not.toHaveClass("no-scroll");
  });
});
