import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { PROFILE } from "@/content/profile";
import { styles } from "./styles";

interface ContactNotificationProps {
  email: string;
  message: string;
}

/** Sent to the site owner when someone uses the contact form. */
export function ContactNotification({
  email,
  message,
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from {email}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading as="h1" style={styles.heading}>
            New message
          </Heading>
          <Text style={styles.subheading}>
            From{" "}
            <Link href={`mailto:${email}`} style={styles.link}>
              {email}
            </Link>
          </Text>
          <Text style={styles.quote}>{message}</Text>
          <Text style={styles.text}>
            Reply to this email to answer directly.
          </Text>
          <Hr style={styles.rule} />
          <Text style={styles.footer}>
            Sent from the contact form on{" "}
            <Link href={PROFILE.website} style={styles.link}>
              {new URL(PROFILE.website).hostname}
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
