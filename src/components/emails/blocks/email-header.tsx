import { Section, Heading, Text } from "@react-email/components";
import { header, h1, badgeText } from "../styles/email-styles";
import { RESUME_DATA } from "@/data/resume-data";

export const EmailHeader = () => {
  return (
    <Section style={header}>
      <Heading style={h1}>{RESUME_DATA.name}</Heading>
      <Text style={badgeText}>{RESUME_DATA.position}</Text>
    </Section>
  );
};
