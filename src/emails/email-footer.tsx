import React from "react";
import { Section, Text } from "@react-email/components";

export const EmailFooter = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <Section
      style={{
        backgroundColor: "#000",
        color: "white",
        padding: "20px",
        fontSize: "0.8em",
        textAlign: "center",
      }}
    >
      <Text className="text-white">
        &copy; {currentYear} VictoriaAjuwon. All rights reserved.
      </Text>
      <Text className="text-white">
        You can reply this mail to directly respond to the customer.
      </Text>
      <Text className="text-white">
        Email: victoria.ajuwon0@gmail.com | Phone: +1 (647) 321-9484
      </Text>
    </Section>
  );
};
