import { SkillsView } from "@/components/admin/skills-view";
import { Header } from "@/components/header";
import { Skills } from "@/lib/data/test";

const AdminSkillsPage = () => {
  const skills = Skills;
  return (
    <>
      <Header isAdmin />
      <SkillsView data={skills} />
    </>
  );
};

export default AdminSkillsPage;
