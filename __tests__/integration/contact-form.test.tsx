import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/features/contact-form";

// Mock the server action
jest.mock("@/actions/contact", () => ({
  sendContactEmail: jest
    .fn()
    .mockResolvedValue({ success: true, message: "Email sent" }),
}));

// Mock the toast
jest.mock("@/components/ui/toaster", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ContactForm Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty submission", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /send message/i });

    // The button is initially disabled until the form is valid based on the component code
    // Let's verify it is disabled.
    expect(submitButton).toBeDisabled();
  });

  it("allows typing and enables submit when valid", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/your email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button", { name: /send message/i });

    expect(submitButton).toBeDisabled();

    // Type invalid email
    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(messageInput, "short");

    expect(submitButton).toBeDisabled();

    // Type valid email and message
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.clear(messageInput);
    await userEvent.type(
      messageInput,
      "This is a meaningful message that passes validation."
    );

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
