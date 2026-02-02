import { Header } from "@/components/header";
import { HomeView } from "@/components/home-view";
import { Projects, Skills } from "@/lib/data/test";

// import {useIsMobile} from "@/hooks/use-mobile";

export default function Home() {
  const projects = Projects;
  const skills = Skills;
  return (
    <>
      <Header />
      <HomeView projects={projects} skills={skills} />
    </>
  );
}
