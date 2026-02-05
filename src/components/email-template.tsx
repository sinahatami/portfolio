import * as React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface ContactEmailProps {
  message: string;
  senderEmail: string;
}

export const ContactEmail = ({ message, senderEmail }: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>New inquiry from {senderEmail}</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-white px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
            <strong>New Contact Request</strong>
          </Heading>

          <Text className="text-[14px] leading-[24px] text-black">
            <strong>From:</strong> {senderEmail}
          </Text>

          <Section className="my-4 rounded-lg bg-[#f2f3f3] p-4">
            <Text className="m-0 text-[14px] leading-[24px] text-black">
              {message}
            </Text>
          </Section>

          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

          <Text className="text-center text-[12px] leading-[24px] text-[#666666]">
            Sent via <strong>Sina Hatami Portfolio</strong> contact form.
            <br />
            <Link
              href="https://sinahatami.github.io"
              className="text-blue-600 no-underline"
            >
              View Website
            </Link>
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
