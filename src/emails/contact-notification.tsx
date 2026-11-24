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
          <Text style={styles.meta}>
            From{" "}
            <Link href={`mailto:${email}`} style={styles.link}>
              {email}
            </Link>
          </Text>
          <Hr style={styles.ruleStrong} />
          <Text style={styles.message}>{message}</Text>
          <Hr style={styles.rule} />
          <Text style={styles.footer}>
            Reply to this email to answer directly.
            <br />
            Sent from the contact form on{" "}
            <Link href={PROFILE.website} style={styles.mutedLink}>
              {new URL(PROFILE.website).hostname}
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
