"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { aboutStatement, bannerBackgroundImages, roles } from "@/lib/constants";
import Link from "next/link";
import { Button } from "./ui/button";

interface BannerProps {
  onRoleSelect?: (role: string) => void;
}

export const Banner = ({ onRoleSelect }: BannerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [text, setText] = useState("");
  //   const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(() => 300 - Math.random() * 100);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("default");
  const sectionRef = useRef(null);

  // Get dynamic role title for typewriter
  const getRoleTitle = () => {
    switch (selectedRole) {
      case "product_manager":
        return "A Product Manager";
      case "web_developer":
        return "A Web Developer";
      case "qa-engineer_tester":
        return "A QA Engineer";
      case "all":
        return "A Multi-Disciplinary Professional";
      default:
        return "A Tech Enthusiast";
    }
  };

  const lines = useMemo(
    () => ["Welcome", "I am Oluwapelumi Victoria Ajuwon", getRoleTitle()],
    [selectedRole]
  );

  const backgroundImages = bannerBackgroundImages;

  const period = 200;

  // Get role title and summary based on selected role
  const getRoleContent = () => {
    switch (selectedRole) {
      case "product_manager":
        return {
          title: "Product Manager",
          summary: aboutStatement.find((s) => s.product)?.product || "",
        };
      case "web_developer":
        return {
          title: "Web Developer",
          summary: aboutStatement.find((s) => s.developer)?.developer || "",
        };
      case "qa-engineer_tester":
        return {
          title: "QA Engineer",
          summary: aboutStatement.find((s) => s.tester)?.tester || "",
        };
      case "all":
        return {
          title: "Multi-Disciplinary Professional",
          summary: aboutStatement.find((s) => s.all)?.all || "",
        };
      default:
        return {
          title: "Tech Enthusiast",
          summary: aboutStatement.find((s) => s.general)?.general || "",
        };
    }
  };

  const roleContent = getRoleContent();

  // Handle role click
  const handleRoleClick = (e: React.MouseEvent, roleLink: string) => {
    e.preventDefault();
    console.log("Role Link:", roleLink);
    const roleId = roleLink.replace("#", "");
    console.log("Role:", roleId);
    setSelectedRole(roleId);
    console.log("Role Selected:", selectedRole);

    // Reset typewriter when role changes
    setText("");
    setIsDeleting(false);

    // Notify parent component of role selection
    if (onRoleSelect) {
      onRoleSelect(roleId);
    }

    // Smooth scroll to roles section
    setTimeout(() => {
      const rolesSection = document.getElementById("roles-section");
      if (rolesSection) {
        rolesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Handle reset to default
  const handleResetToDefault = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedRole("default");

    // Reset typewriter when role changes
    setText("");
    setIsDeleting(false);

    // Notify parent component of role selection
    if (onRoleSelect) {
      onRoleSelect("default");
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to render about statement with ALL as a clickable link
  const renderAboutStatement = (statement: string) => {
    const parts = statement.split("ALL");

    if (parts.length === 1) {
      return <>{statement}</>;
    }

    return (
      <>
        {parts[0]}
        <Button
          asChild
          variant="link"
          className="p-0 m-0 h-auto"
          onClick={(e) => handleRoleClick(e, "#all")}
        >
          <a
            href="#all"
            className="text-white/50 hover:text-blue-400 hover:underline font-bold transition-colors duration-200 cursor-pointer"
          >
            ALL
          </a>
        </Button>
        {parts[1]}
      </>
    );
  };

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

  //Background image rotation
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
    return () => clearInterval(imageInterval);
  }, [backgroundImages.length]);

  // Typewriter effect
  const tick = useCallback(() => {
    const fullText = lines.join("\n");

    const updatedText: string = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setDelta(500);
    }
  }, [isDeleting, text.length, lines, period]);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [delta, tick]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen items-center overflow-hidden"
    >
      {/* Background Image Carousel with Overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
              unoptimized={true}
            />
          </div>
        ))}

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 py-20">
        <div className="flex gap-8 items-center">
          {/* Text Content */}
          <div className="md:flex-1">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Typewriter */}
              <div className="mb-6 min-h-36 md:min-h-48 lg:min-h-56">
                <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  <pre className="font-sans whitespace-pre-wrap break-keep leading-relaxed">
                    {text}
                    <span className="animate-pulse">|</span>
                  </pre>
                </div>
              </div>

              {/* Roles & About Statement */}
              <div className="flex justify-center items-center">
                <div className="mt-6 text-lg md:text-xl text-white max-w-2xl">
                  {/* Roles */}
                  <div className="mb-4 text-white/90 text-center">
                    {selectedRole === "default" &&
                      roles.map((role, index) => (
                        <span key={index}>
                          <Button
                            asChild
                            variant="link"
                            className="p-0 m-0"
                            onClick={(e) => handleRoleClick(e, role.link)}
                          >
                            <Link
                              href={role.link}
                              className="text-white/50 hover:text-blue-400 hover:underline font-bold transition-colors duration-200"
                            >
                              {role.name}
                            </Link>
                          </Button>
                          {index < roles.length - 1 && (
                            <span className="mx-2 text-white/50">|</span>
                          )}
                        </span>
                      ))}

                    {/* About statement */}
                    <p className="leading-relaxed text-white max-w-2xl mx-auto">
                      {selectedRole === "default"
                        ? renderAboutStatement(roleContent.summary)
                        : roleContent.summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls - Image Indicators and Reset Link */}
      <div className="absolute bottom-8 left-0 right-0 px-4 z-20">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          {/* Left side - Image indicator */}
          <div className="flex gap- flex-1 justify-center">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Right side - Reset Link (only show when not on defaulth) */}
          {selectedRole !== "default" && (
            <Button
              asChild
              variant="link"
              className="p-0 m-0 h-auto"
              onClick={handleResetToDefault}
            >
              <Link
                href="#default"
                className="text-white/50 hover:text-blue-400 hover:underline font-bold transition-colors dureation-200 cursor-pointer text-sm"
              >
                Check Other Roles
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
