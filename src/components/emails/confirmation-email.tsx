import { RESUME_DATA } from "@/data/resume-data";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";

interface ConfirmationEmailProps {
  senderEmail: string;
}

export const ConfirmationEmail = ({ senderEmail }: ConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Message received: I'll get back to you soon!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={header}>
            <Heading style={h1}>{RESUME_DATA.name}</Heading>
            <Text style={badgeText}>{RESUME_DATA.position}</Text>
          </Section>

          {/* Content Section */}
          <Section style={content}>
            <Text style={text}>Hi there,</Text>
            <Text style={text}>
              Thank you for reaching out! I've successfully received your
              message sent from <strong>{senderEmail}</strong>.
            </Text>
            <Text style={text}>
              I'm currently reviewing my inbox and will get back to you as soon
              as possible. In the meantime, feel free to check out my latest
              updates on GitHub.
            </Text>

            <Section style={buttonContainer}>
              <Link href={RESUME_DATA.contact.social.github.url} style={button}>
                View My GitHub
              </Link>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer Section */}
          <Section style={footer}>
            <Text style={footerText}>
              {RESUME_DATA.location} • Bridging Software & Data
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#020617",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  width: "580px",
  maxWidth: "100%",
};

const header = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const h1 = {
  color: "#f8fafc",
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "10px 0",
  letterSpacing: "-0.5px",
};

const badgeText = {
  backgroundColor: "rgba(59, 130, 246, 0.1)",
  color: "#3b82f6",
  fontSize: "12px",
  fontWeight: "600",
  padding: "4px 12px",
  borderRadius: "100px",
  textAlign: "center" as const,
  width: "fit-content",
  margin: "0 auto",
  border: "1px solid rgba(59, 130, 246, 0.2)",
};

const content = {
  padding: "20px 0",
};

const text = {
  color: "#94a3b8", // slate-400
  fontSize: "16px",
  lineHeight: "26px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#1e293b",
  margin: "20px 0",
};

const footer = {
  textAlign: "center" as const,
};

const footerText = {
  color: "#475569",
  fontSize: "12px",
};
