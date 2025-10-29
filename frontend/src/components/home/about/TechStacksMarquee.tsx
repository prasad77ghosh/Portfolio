import { cn } from "@/lib/utils";
import { Marquee } from "../../ui/marquee";

const techStacks = [
  {
    name: "React",
    description: "Frontend Library",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    description: "Fullstack Framework",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TypeScript",
    description: "Typed JavaScript",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Node.js",
    description: "Backend Runtime",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    description: "Backend Framework",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "MongoDB",
    description: "NoSQL Database",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "TailwindCSS",
    description: "CSS Framework",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Docker",
    description: "Containerization",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Python",
    description: "Programming Language",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Django",
    description: "Python Framework",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },
  {
    name: "PostgreSQL",
    description: "SQL Database",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Redis",
    description: "In-Memory Database",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Vue.js",
    description: "Frontend Framework",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "Angular",
    description: "Frontend Framework",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "Java",
    description: "Programming Language",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Spring Boot",
    description: "Java Framework",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "AWS",
    description: "Cloud Platform",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  },
  {
    name: "Kubernetes",
    description: "Container Orchestration",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "GraphQL",
    description: "Query Language",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Firebase",
    description: "Backend Platform",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "Git",
    description: "Version Control",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    description: "Code Repository",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "VS Code",
    description: "Code Editor",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    name: "Figma",
    description: "Design Tool",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
];

const firstRow = techStacks.slice(0, techStacks.length / 2);
const secondRow = techStacks.slice(techStacks.length / 2);

const TechCard = ({
  img,
  name,
  description,
}: {
  img: string;
  name: string;
  description: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-48 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col items-center justify-center",
        // light styles with very subtle gradient
        "border-gray-950/[.1] bg-gradient-to-br from-purple-25 via-pink-25 to-orange-25 hover:from-purple-50 hover:via-pink-50 hover:to-orange-50",
        // dark styles with very subtle gradient
        "dark:border-gray-50/[.1] dark:bg-gradient-to-br dark:from-purple-950/10 dark:via-pink-950/10 dark:to-orange-950/10 dark:hover:from-purple-950/20 dark:hover:via-pink-950/20 dark:hover:to-orange-950/20",
      )}
    >
      <img className="rounded-md" width="40" height="40" alt={name} src={img} />
      <figcaption className="mt-2 text-sm font-medium dark:text-white">
        {name}
      </figcaption>
      <p className="text-xs font-medium dark:text-white/40">{description}</p>
    </figure>
  );
};

export function TechMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 sm:py-10 lg:py-12">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((tech) => (
          <TechCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}