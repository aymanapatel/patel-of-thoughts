interface ProfileLinks {
  github: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  blog: string;
  hashnode: string;
  email: string;
  cv: string;
}

interface Profile {
  name: string;
  role: string;
  tagline: string;
  links: ProfileLinks;
  education: { institution: string; degree: string; status: string }[];
  experience: { company: string; title: string; start: string; end?: string; description: string }[];
  timeline: {
    type: "education" | "work" | "fellowship";
    org: string;
    title: string;
    start?: string;
    end?: string;
    description: string;
    href?: string;
  }[];
}

export const profile: Profile = {
  name: "Ayman Patel",
  role:
    "Senior Full Stack Engineer (Java, Spring Boot, React, TypeScript), ex-Mastercard, based in London. MSc Advanced Computer Science, Queen Mary University of London",
  tagline:
    "I build resilient systems, thoughtful developer experiences, and products that scale from prototype to production.",
  links: {
    github: "https://github.com/aymanapatel",
    linkedin: "https://www.linkedin.com/in/aymanapatel/",
    youtube: "https://www.youtube.com/@patelofthought",
    twitter: "https://www.x.com/ayman_alderson",
    blog: "/blog",
    hashnode: "https://aymanace2049.hashnode.dev/",
    email: "mailto:ayman.patel97@gmail.com",
    cv: "/ayman-cv.pdf",
  },
  education: [
    {
      institution: "Queen Mary University of London (QMUL)",
      degree: "MSc in Advanced Computer Science",
      status: "Completed, 2025–2026",
    },
    {
      institution: "SVNIT, Surat",
      degree: "Bachelors in Computer Engineering",
      status: "Graduated in 2019",
    },
  ],
  experience: [
    {
      company: "Mastercard",
      title: "Senior Software Engineer",
      start: "2019",
      end: "2025",
      description:
        "Led the micro frontend architecture for the customer onboarding platform, and wrote a white paper on it that was published with CTO recognition. Built resilient Spring Boot APIs for the franchise legal and customer onboarding platforms, with full-stack ownership across frontend, backend, DevOps, and production issue triage.",
    },
    {
      company: "Mastercard",
      title: "Intern",
      start: "2018",
      description:
        "Rotated across engineering teams, shipping internal tools and learning enterprise-scale systems.",
    },
  ],
  timeline: [
    {
      type: "education" as const,
      org: "Queen Mary University of London (QMUL)",
      title: "MSc in Advanced Computer Science",
      start: "2025",
      end: "2026",
      description: "Completed an MSc in Advanced Computer Science.",
      href: "/me/qmul-masters",
    },
    {
      type: "fellowship" as const,
      org: "Nebius Academy",
      title: "AI Engineering Fellowship",
      description: "Completed an AI engineering fellowship.",
    },
    {
      type: "work" as const,
      org: "Mastercard",
      title: "Senior Software Engineer",
      start: "2019",
      end: "2025",
      description:
        "Led the micro frontend architecture for the customer onboarding platform, and wrote a white paper on it that was published with CTO recognition. Built resilient Spring Boot APIs for the franchise legal and customer onboarding platforms, with full-stack ownership across frontend, backend, DevOps, and production issue triage.",
    },
    {
      type: "work" as const,
      org: "Mastercard",
      title: "Intern",
      start: "2018",
      description: "Rotated across engineering teams, shipping internal tools and learning enterprise-scale systems.",
    },
    {
      type: "education" as const,
      org: "SVNIT, Surat",
      title: "Bachelors in Computer Engineering",
      start: "2015",
      end: "2019",
      description: "Graduated with a degree in Computer Engineering, building a strong foundation in systems, algorithms, and software design.",
    },
  ],
};
