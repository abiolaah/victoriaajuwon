import { ProjectView } from "@/components/admin/projects-view";
import { Header } from "@/components/header";
import { Projects, Skills } from "@/lib/data/test";

const AdminProjectsPrage = () => {
  const projects = Projects;
  const skills = Skills;
  return (
    <>
      <Header isAdmin />
      <ProjectView data={projects} skills={skills} />
    </>
  );
};

export default AdminProjectsPrage;
