import { render } from "@react-email/render";
import { PROFILE } from "@/content/profile";
import { ContactConfirmation } from "@/emails/contact-confirmation";
import { ContactNotification } from "@/emails/contact-notification";

const email = "visitor@example.com";
const host = new URL(PROFILE.website).hostname;

describe("contact emails", () => {
  it("gives the owner the sender, the message and a way to reply", async () => {
    const html = await render(
      <ContactNotification
        email={email}
        message={"Hello,\n\nA role for you."}
      />
    );

    expect(html).toContain(`href="mailto:${email}"`);
    expect(html).toContain("A role for you.");
    expect(html).toContain("Reply to this email to answer directly.");
    expect(html).toContain(host);
  });

  it("shows the visitor's message as text, never as markup", async () => {
    const html = await render(
      <ContactNotification email={email} message="<b>hi</b>" />
    );

    expect(html).toContain("&lt;b&gt;hi&lt;/b&gt;");
    expect(html).not.toContain("<b>hi</b>");
  });

  it("confirms receipt to the visitor", async () => {
    const html = await render(<ContactConfirmation email={email} />);

    expect(html).toContain(PROFILE.name);
    expect(html).toContain(email);
    expect(html).toContain("See my work on GitHub");
    expect(html).toContain(host);
  });
});
