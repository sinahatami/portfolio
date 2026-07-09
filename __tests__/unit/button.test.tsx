import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import preview from "jest-preview";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    // Example: Use preview.debug() to open this specific DOM state in your browser!
    // preview.debug();

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("applies the destructive variant class", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-destructive");
  });

  it("applies the correct size class", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button", { name: /large button/i });
    expect(button).toHaveClass("h-11");
  });

  it("handles clicks correctly", async () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Clickable</Button>);

    const button = screen.getByRole("button", { name: /clickable/i });
    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
