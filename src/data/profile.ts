export const profile = {
  name: "Ayman Patel",
  role:
    "Currently pursuing masters in QMUL and worked as senior software engineer at Mastercard",
  tagline:
    "I build resilient systems, thoughtful developer experiences, and products that scale from prototype to production.",
  links: {
    github: "https://github.com/aymanapatel",
    linkedin: "https://www.linkedin.com/in/aymanapatel",
    youtube: "https://www.youtube.com/@patelofthought",
    blog: "/blog",
    cv: "/cv.pdf",
  },
  education: [
    {
      institution: "Queen Mary University of London (QMUL)",
      degree: "Masters in Advanced Computer Science",
      status: "Currently pursuing",
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
        "Led delivery of backend services and developer platforms with a focus on reliability, observability, and secure integration.",
    },
    {
      company: "Mastercard",
      title: "Intern",
      start: "2018",
      end: "2018",
      description:
        "Rotated across engineering teams, shipping internal tools and learning enterprise-scale systems.",
    },
  ],
  timeline: [
    {
      type: "education" as const,
      org: "Queen Mary University of London (QMUL)",
      title: "Masters in Advanced Computer Science",
      start: "2025",
      end: "Present",
      description: "Pursuing an advanced degree focused on distributed systems, AI, and modern software architecture.",
    },
    {
      type: "work" as const,
      org: "Mastercard",
      title: "Senior Software Engineer",
      start: "2019",
      end: "2025",
      description: "Led delivery of backend services and developer platforms with a focus on reliability, observability, and secure integration.",
    },
    {
      type: "work" as const,
      org: "Mastercard",
      title: "Intern",
      start: "2018",
      end: "2018",
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
