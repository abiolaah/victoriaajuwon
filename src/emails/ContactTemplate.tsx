import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import { EmailHeader } from "./email-header";
import { EmailFooter } from "./email-footer";

type ContactEmailProps = {
  subject?: string;
  name: string;
  message: string;
  email: string;
  phone?: string;
};

const ContactTemplate = ({
  name,
  message,
  phone,
  subject,
}: ContactEmailProps) => {
  const previewText = subject ? `${subject}` : "General Inquiry";
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Section style={coverSection}>
              <EmailHeader />
              <Section style={verificationSection}>
                <Heading style={h1}>
                  You have received an inquiry via your portfolio website
                </Heading>
                <Text style={verifyText}>Dear Victoria,</Text>
                <Text style={verifyText}>Here is the message from {name}</Text>
                <Text style={codeText}>
                  {message || "Demo message from Marissa Storm"}
                </Text>
                <Text style={verifyText}>
                  You can reach {name} on {phone}
                </Text>
              </Section>
              <EmailFooter />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactTemplate;

const main = {
  backgroundColor: "#000",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "100%",
  maxWidth: "600px",
};

const coverSection = {
  padding: "24px",
  backgroundColor: "#000",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  padding: "0",
};

const verificationSection = {
  margin: "0 auto",
  width: "100%",
};

const verifyText = {
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  margin: "16px 0",
  color: "#ffffff",
};

const codeText = {
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
  padding: "12px",
  backgroundColor: "#f4f4f4",
  borderRadius: "4px",
  wordBreak: "break-word" as const,
};
