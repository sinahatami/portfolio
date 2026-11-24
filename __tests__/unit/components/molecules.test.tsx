import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpandableText, FormField } from "@/components/molecules";

describe("ExpandableText", () => {
  it("toggles the full text and its aria-expanded state", async () => {
    render(
      <ExpandableText
        text={"First paragraph.\n\nSecond paragraph."}
        expandLabel="Read more"
        collapseLabel="Read less"
      />
    );
    const toggle = screen.getByRole("button", { name: /read more/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Second paragraph.")).not.toBeVisible();

    await userEvent.click(toggle);

    expect(screen.getByRole("button", { name: /read less/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByText("Second paragraph.")).toBeVisible();
  });
});

describe("FormField", () => {
  it("wires label, hint and error to the control", () => {
    render(
      <FormField id="email" label="Email" hint="We reply fast" error="Required">
        {(control) => <input {...control} />}
      </FormField>
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("We reply fast Required");
  });
});
