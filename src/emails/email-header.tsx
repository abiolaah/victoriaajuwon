import { Img, Section, Text } from "@react-email/components";

export const EmailHeader = () => {
  return (
    <Section style={header}>
      <Img
        src="https://res.cloudinary.com/dixwarqdb/image/upload/v1747635235/logo-mobile_hbvkde.png"
        alt="Victoria Ajuwon Logo"
        width={200}
        height={100}
        style={image}
      />
      <Text style={textStyle} className="text-white/70">
        Victoria Ajuwon
      </Text>
    </Section>
  );
};

const header = {
  backgroundColor: "#000",
  color: "white",
  padding: "20px",
  textAlign: "center" as const,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
  borderBottom: "1px solid #e1e1e1",
};

const image = { display: "flex", margin: "0 auto" };

const textStyle = { fontSize: "24px", fontWeight: "bold", marginTop: "10px" };
