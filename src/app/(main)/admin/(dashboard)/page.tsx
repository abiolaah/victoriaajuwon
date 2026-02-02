import { DashboardView } from "@/components/admin/dashboard/dashboard-view";
import { Header } from "@/components/header";
import { Projects, Skills } from "@/lib/data/test";

const AdminDashboardPage = () => {
  const projects = Projects;
  const skills = Skills;
  return (
    <>
      <Header isAdmin />
      <div>
        <DashboardView projects={projects} skills={skills} />
      </div>
    </>
  );
};

export default AdminDashboardPage;
