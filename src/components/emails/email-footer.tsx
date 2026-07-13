import { Section, Text } from "@react-email/components";
import { footer, footerText } from "./email-styles";
import { RESUME_DATA } from "@/data/resume-data";

export const EmailFooter = () => {
  return (
    <Section style={footer}>
      <Text style={footerText}>
        {RESUME_DATA.location} • Bridging Software & Data
      </Text>
    </Section>
  );
};
