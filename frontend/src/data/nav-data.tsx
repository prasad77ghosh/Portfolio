import { Home, Briefcase, BookOpen, Layers, User } from "lucide-react";
import { ReactNode } from "react";

type LinkItem = {
  id: string;
  link: string;
  icon?: ReactNode;
  title: string;
};

const links: LinkItem[] = [
  {
    id: '1',
    title: "Home",
    link: "/",
    icon: <Home className="w-4 h-4" />,
  },
  {
    id: '2',
    title: "About",
    link: "/about",
    icon: <User className="w-4 h-4"  />,
  },
  {
    id: '3',
    title: "Portfolio",
    link: "/portfolio",
    icon: <Briefcase className="w-4 h-4"  />,
  },
  {
    id: '4',
    title: "Contents",
    link: "/contents",
    icon: <BookOpen className="w-4 h-4"  />,
  },
  {
    id: '5',
    title: "Projects",
    link: "/projects",
    icon: <Layers className="w-4 h-4" />,
  },
];

export default links;
