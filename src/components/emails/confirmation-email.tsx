import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
} from "@react-email/components";
import { main, container, hr } from "./email-styles";
import { EmailHeader } from "./email-header";
import { EmailContent } from "./email-content";
import { EmailFooter } from "./email-footer";

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
          <EmailHeader />
          <EmailContent senderEmail={senderEmail} />
          <Hr style={hr} />
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};
