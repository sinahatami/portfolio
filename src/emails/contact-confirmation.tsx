import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { PROFILE } from "@/content/profile";
import { styles } from "./styles";

interface ContactConfirmationProps {
  email: string;
}

const github = PROFILE.socials.find((social) => social.id === "github");

/** Receipt sent to the visitor after their message is delivered. */
export function ContactConfirmation({ email }: ContactConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>I received your message and will reply soon.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading as="h1" style={styles.heading}>
            {PROFILE.name}
          </Heading>
          <Text style={styles.subheading}>{PROFILE.role}</Text>
          <Text style={styles.text}>Hi,</Text>
          <Text style={styles.text}>
            Thanks for getting in touch. Your message from{" "}
            <strong>{email}</strong> reached my inbox, and I usually reply
            within a day.
          </Text>
          {github ? (
            <Section style={{ margin: "24px 0" }}>
              <Link href={github.url} style={styles.button}>
                See my work on GitHub
              </Link>
            </Section>
          ) : null}
          <Hr style={styles.rule} />
          <Text style={styles.footer}>
            {PROFILE.name}, {PROFILE.location.label}
            <br />
            <Link href={PROFILE.website} style={styles.link}>
              {new URL(PROFILE.website).hostname}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
