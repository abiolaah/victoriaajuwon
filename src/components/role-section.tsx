import React, { useState, useEffect, useRef } from "react";
import { List } from "@/components/list";
import { resolveRoleFromString } from "@/lib/utils";
import { Role } from "@/types/role";
import { ProjectsProps, SkillsProps } from "@/lib/types";

interface RolesSectionProps {
  selectedRole: string;
  skills: SkillsProps[];
  projects: ProjectsProps[];
}

const RolesSection: React.FC<RolesSectionProps> = ({
  selectedRole,
  skills,
  projects,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  const role: Role = resolveRoleFromString(selectedRole) || ("ALL" as Role);

  console.log("SelectedRole in section:", selectedRole);
  console.log("Role in section:", role);

  // Filter skills and projects based on selected role
  const getFilteredData = () => {
    switch (selectedRole) {
      case "product_manager":
        return {
          skills: skills.filter((skill) =>
            skill.roles.some((r) => r.role === role)
          ),
          projects: projects.filter((project) =>
            project.roles.some((r) => r.role === role)
          ),
        };
      case "web_developer":
        return {
          skills: skills.filter((skill) =>
            skill.roles.some((r) => r.role === role)
          ),
          projects: projects.filter((project) =>
            project.roles.some((r) => r.role === role)
          ),
        };
      case "qa-engineer_tester":
        return {
          skills: skills.filter((skill) =>
            skill.roles.some((r) => r.role === role)
          ),
          projects: projects.filter((project) =>
            project.roles.some((r) => r.role === role)
          ),
        };
      case "all":
        return {
          skills: skills,
          projects: projects,
        };
      default:
        return {
          skills: [],
          projects: [],
        };
    }
  };

  const { skills: filteredSkills, projects: filteredProjects } =
    getFilteredData();

  // console.log("Filtered Skills:", filteredSkills);
  // console.log("Filtered Projects:", filteredProjects);

  // Create infinite carousel data by tripling the items
  const infiniteSkills = [
    ...filteredSkills,
    ...filteredSkills,
    ...filteredSkills,
  ];

  const infiniteProjects = [
    ...filteredProjects,
    ...filteredProjects,
    ...filteredProjects,
  ];

  // Intersection Observer for visibility tracking
  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Reset visibility and scroll position when role changes
  // Reset visibility when role changes - use layout effect pattern
  useEffect(() => {
    // Use requestAnimationFrame to defer state update
    requestAnimationFrame(() => {
      setIsVisible(false);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, [selectedRole]);

  const handleSkillsScroll = () => {
    const container = skillsContainerRef.current;
    if (!container) return;

    // Log or track scroll position if needed
    console.log("Skills scrolled to:", container.scrollLeft);
  };

  const handleProjectsScroll = () => {
    const container = projectsContainerRef.current;
    if (!container) return;

    // Log or track scroll position if needed
    console.log("Projects scrolled to:", container.scrollLeft);
  };

  if (selectedRole === "default") return null;

  return (
    <section
      id="roles-section"
      ref={sectionRef}
      className={`relative py-20 bg-linear-to-b from-black to-zinc-900 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <List
          title="Skills"
          data={infiniteSkills}
          dataType="skill"
          role={role}
          onScrollLeft={() => handleSkillsScroll()}
          onScrollRight={() => handleSkillsScroll()}
          containerRef={skillsContainerRef}
        />

        <List
          title="Projects"
          data={infiniteProjects}
          dataType="project"
          skills={skills}
          role={role}
          onScrollLeft={() => handleProjectsScroll()}
          onScrollRight={() => handleProjectsScroll()}
          containerRef={projectsContainerRef}
        />
      </div>
    </section>
  );
};

export default RolesSection;
