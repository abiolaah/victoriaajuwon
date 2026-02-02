import { HistoryView } from "@/components/admin/history-view";
import { Header } from "@/components/header";
import { Education, Experience } from "@/lib/data/test";

const AdminHistoryPage = () => {
  // Experience Function
  const experiences = Experience;
  // Education Functions
  const education = Education;
  return (
    <>
      <Header isAdmin />
      <HistoryView experiences={experiences} education={education} />
    </>
  );
};

export default AdminHistoryPage;
