import { Role } from "@/types/role";

export const navMenuItem = [
  { name: "Home", link: "/" },
  { name: "History", link: "/experience" },
  { name: "Contact", link: "/contact" },
];

export const adminNavMenuItem = [
  { name: "Home", link: "/admin" },
  { name: "Summary", link: "/admin/summary" },
  { name: "History", link: "/admin/history" },
  { name: "Skills", link: "/admin/skills" },
  { name: "Projects", link: "/admin/projects" },
  { name: "Logout", link: "/" },
];

export const roles = [
  { name: "Product Manager", link: "#product_manager" },
  { name: "Web Developer", link: "#web_developer" },
  { name: "QA Engineer", link: "#qa-engineer_tester" },
];

export const RoleList = [Role.PRODUCT_MANAGER, Role.DEVELOPER, Role.TESTER];

export const bannerBackgroundImages = [
  "https://res.cloudinary.com/dixwarqdb/image/upload/v1747760291/developer_gofw6r.gif",
  "https://res.cloudinary.com/dixwarqdb/image/upload/v1747760290/adventurer_yftocm.gif",
  "https://res.cloudinary.com/dixwarqdb/image/upload/v1747760291/recruiter_llz80w.gif",
  "https://res.cloudinary.com/dixwarqdb/image/upload/v1747760293/tester_vwjno7.gif",
];

export const aboutStatement = [
  {
    general:
      "From leading product strategy professionally to building functional websites to ensuring quality through rigorous testing — I’ve cultivated a unique, multi-disciplinary skill set across real-world and hands-on project experience. Click any role above to dive deeper, or select ALL for my full story.",
  },
  {
    product:
      "I am a dedicated tech enthusiast with a passion for leveraging technology to solve real-world problems. With a background in product management, web development, and quality assurance, I bring a holistic approach to creating impactful digital solutions.",
  },
  {
    developer:
      "From leading product strategy professionally to building functional websites to ensuring quality through rigorous testing — I’ve cultivated a unique, multi-disciplinary skill set across real-world and hands-on project experience. Click any role above to dive deeper, or select ALL for my full story.",
  },
  {
    tester:
      "I am a dedicated tech enthusiast with a passion for leveraging technology to solve real-world problems. With a background in product management, web development, and quality assurance, I bring a holistic approach to creating impactful digital solutions.",
  },
  {
    all: "I am a dedicated tech enthusiast with a passion for leveraging technology to solve real-world problems. With a background in product management, web development, and quality assurance, I bring a holistic approach to creating impactful digital solutions.",
  },
];

export const aboutTabs = [
  { key: "all", label: "All" },
  { key: "general", label: "General" },
  { key: "product", label: "Product" },
  { key: "developer", label: "Developer" },
  { key: "tester", label: "Tester" },
] as const;

export const imageTab = {
  key: "image",
  label: "Image",
} as const;

export type AboutTabKey = (typeof aboutTabs)[number]["key"];
export type SummaryTabList = AboutTabKey | "image";
