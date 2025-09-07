import { Home, Info, Briefcase, BookOpen, Layers } from "lucide-react";
import { ReactNode } from "react";

type LinkItem = {
  id: number;
  link: string;
  icon?: ReactNode;
  title: string;
};

const links: LinkItem[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "About",
    link: "/about",
    icon: <Info className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Portfolio",
    link: "/portfolio",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Contents",
    link: "/contents",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Projects",
    link: "/projects",
    icon: <Layers className="w-5 h-5" />,
  },
];

export default links;
