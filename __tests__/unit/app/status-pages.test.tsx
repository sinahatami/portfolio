import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Mock } from "vitest";
import ErrorPage from "@/app/error";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("ErrorPage", () => {
  let consoleError: Mock;
  beforeEach(() => {
    consoleError = vi.fn();
    vi.spyOn(console, "error").mockImplementation(consoleError);
  });
  afterEach(() => vi.restoreAllMocks());

  it("shows the error reference and retries on request", async () => {
    const reset = vi.fn();
    const error = Object.assign(new Error("boom"), { digest: "1327861190" });
    render(<ErrorPage error={error} reset={reset} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "This page failed to load",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("1327861190")).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalledWith(error);

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("link", { name: "Go to the home page" })
    ).toHaveAttribute("href", "/");
  });

  it("leaves the reference out when the error has none", () => {
    render(<ErrorPage error={new Error("boom")} reset={vi.fn()} />);
    expect(screen.queryByText(/Error reference/)).not.toBeInTheDocument();
  });
});
