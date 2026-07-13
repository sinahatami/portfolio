import { Section, Text, Link } from "@react-email/components";
import { content, text, buttonContainer, button } from "./email-styles";
import { RESUME_DATA } from "@/data/resume-data";

interface EmailContentProps {
  senderEmail: string;
}

export const EmailContent = ({ senderEmail }: EmailContentProps) => {
  return (
    <Section style={content}>
      <Text style={text}>Hi there,</Text>
      <Text style={text}>
        Thank you for reaching out! I've successfully received your message sent
        from <strong>{senderEmail}</strong>.
      </Text>
      <Text style={text}>
        I'm currently reviewing my inbox and will get back to you as soon as
        possible. In the meantime, feel free to check out my latest updates on
        GitHub.
      </Text>

      <Section style={buttonContainer}>
        <Link href={RESUME_DATA.contact.social.github.url} style={button}>
          View My GitHub
        </Link>
      </Section>
    </Section>
  );
};
