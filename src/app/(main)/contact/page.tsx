"use client";

import React from "react";
import { toast } from "sonner";
import { ContactForm } from "@/components/contact-form";
import { ContactFormSchema } from "@/types/contactSchema";
import { sendContactEmailAction } from "@/action/sendEmail";
import { Header } from "@/components/header";

const ContactPage = () => {
  const onSubmit = async (values: ContactFormSchema) => {
    // console.log({ values });
    try {
      const response = await sendContactEmailAction(values);

      if (!response.success) {
        toast.error("Failed to send message", {
          description: response.issues
            ? "Please check the form fields."
            : (response.error ?? "Unknown error"),
        });
        return;
      }

      toast.success("Email Sent", {
        description: "An email has been sent. You should get a response soon.",
      });
    } catch (error: unknown) {
      toast.error("Something went wrong", {
        description:
          error instanceof Error ? error.message : "Unexpected error occurred.",
      });
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <ContactForm onSubmit={onSubmit} />;
    </>
  );
};

export default ContactPage;
