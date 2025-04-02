import { Icons } from "@/components/icons";
import { HomeIcon, MailIcon } from "lucide-react";

export const DATA = {
  name: "Mohit Gour",
  initials: "DV",
  url: "https://dillion.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "MERN Full-Stack Developer passionate about building scalable, high-performance web applications.",
  summary:
    "I graduated with a degree in Computer Science and Engineering in 2024, driven by a passion for building scalable web applications and solving complex problems. As a MERN Full-Stack Developer, I specialize in creating high-performance, user-friendly solutions using React, Node.js, Express, and MongoDB. I am always eager to learn, optimize, and explore new technologies to enhance my development skills.",
  avatarUrl: "/me.png",
  skills: [
    "Figma",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "RESTful APIs",
    "MongoDB",
    "Postgres",
    "MySQL",
    "AWS EC2",
    "S3 Bucket",
    "CI/CD",
    "Git",
    "GitHub",
    "Azure DevOps",
    "Swagger",
    "Postman",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "gourmohit2001@gmail.com",
    tel: "+91 8770550853",
    social: {
      email: {
        name: "Send Email",
        url: "mailto:gourmohit2001@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/mohitgour09",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mohit-gour/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/MohitGo90133115?t=vQ0SOVriaspPhAp4hJLXQw&s=09",
        icon: Icons.x,

        navbar: true,
      },
      // Youtube: {
      //   name: "Youtube",
      //   url: "https://dub.sh/dillion-youtube",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
    },
  },

  work: [
    {
      company: "MicroTechnologies",
      href: "https://mtnptech.com/",
      badges: [],
      location: "Hybrid",
      title: "Software Engineer",
      logoUrl: "/microtechnologies.jpg",
      start: "Feb 2023",
      end: "Present",
      description:
        "At MicroTechnologies, I played a key role in designing class diagrams and Figma prototypes to ensure project alignment with client requirements. I developed full-stack web applications using React.js, Node.js, Express.js, PostgreSQL, and MySQL, focusing on creating intuitive user interfaces and seamless interactions. To enhance performance and scalability, I optimized database schemas and backend architecture while integrating and documenting RESTful APIs using Swagger & Postman for improved frontend-backend communication. Additionally, I implemented CI/CD pipelines with GitHub Actions & AWS EC2, streamlining deployment processes and fostering better collaboration through Git/GitHub.",
    },
  ],
  education: [
    {
      school: "Sagar Institue of Science and Technology",
      href: "https://www.sistec.ac.in/",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      logoUrl: "/SISTec_Logo.png",
      start: "2020",
      end: "2024",
    },
    {
      school: "SENIOR HIGH SCHOOL (12th)",
      href: "https://www.christmemorialschool.org/",
      degree: "Christ Memorial School, PCM - 77%",
      logoUrl: "/cms.png",
      start: "2019",
      end: "2020",
    },
    {
      school: "HIGH SCHOOL (10th)",
      href: "https://www.christmemorialschool.org/",
      degree: "Christ Memorial School - 77.7%",
      logoUrl: "/cms.png",
      start: "2017",
      end: "2018",
    },
  ],
  projects: [
    {
      title: "MedStream",
      href: "https://github.com/Hospital-management-system1/Hospital-management",
      dates: "",
      active: true,
      description:
        "I developed a healthcare management system with Role-Based Access Control (RBAC) for Admins, Doctors, and Patients, ensuring secure and efficient access. It features an appointment scheduling system to reduce wait times, patient records management for tracking medical history, and a user-friendly interface for seamless navigation, optimizing healthcare workflows.",
      technologies: [
        "Node.js",
        "Express",
        "javascript",
        "React",
        "PostgreSQL",
        "TailwindCSS",
        "Razorpay",
        "Daisy UI",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Hospital-management-system1/Hospital-management",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/medstream.mp4",
    },
    {
      title: "SkillShala, E-Learning Platform",
      href: "https://github.com/Ed-Tech-project/Ed-Tech",
      dates: "",
      active: true,
      description:
        "I developed a comprehensive online learning system with Admin, Instructor, and Student modules. Admins manage users, Instructors handle course content, and Students enroll and track progress. It includes secure authentication, role-based access control, course management, and live & recorded classes for interactive learning.",
      technologies: [
        "Next.js",
        "javascript",
        "PostgreSQL",
        "TailwindCSS",
        "Razorpay",
        "Daisy UI",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Ed-Tech-project/Ed-Tech",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/skillshala.mp4",
    },
    {
      title: "OnlineBazar, E-Commerce Platform",
      href: "",
      dates: "",
      active: true,
      description: "Online Bazaar is an innovative e-commerce platform designed to connect retailers and customers for a seamless shopping experience. It features three key modules: Administrator, responsible for managing users and platform operations; Retailer, handling product listings and inventory; and Customer, enabling effortless browsing, purchasing, and order tracking. This project was a dynamic and challenging venture, focusing on efficiency, security, and user-friendly interactions",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
        "TailwindCSS",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "ASW S3",
      ],
      links: [
        {
          type: "Source",
          href: "",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "",
      dates: "",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Source",
          href: "",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
 
} as const;
