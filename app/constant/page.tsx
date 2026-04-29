import {
  ChartBarIncreasing,
  LogIn,
  LogInIcon,
  PanelsTopLeft,
  Settings,
  User,
} from "lucide-react";
export const navItems = [
  { id: 1, label: "Home", href: "/components/home" },
  { id: 2, label: "Dashboard", href: "/components/dashboard" },
  { id: 3, label: "Analytics", href: "/components/analytics" },
];

export const itemsForCard = [
  { id: 1, name: "Total links", total: "24", week: "+3 this week" },
  { id: 2, name: "Total clicks", total: "4,821", week: "+12% vs last week" },
  { id: 3, name: "Top link clicks", total: "1204", week: "lnksnp.io/resume" },
  { id: 4, name: "Avg CTR", total: "201", week: "clicks per link" },
];

export const items = [
  { id: "home", name: "Home", icon: PanelsTopLeft, link: "/components/home" },
  {
    id: "overview",
    name: "Overview",
    icon: PanelsTopLeft,
    link: "/components/overview",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: ChartBarIncreasing,
    link: "/components/analytics",
  },
  { id: "profile", name: "Profile", icon: User, link: "/components/profile" },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    link: "/components/settings",
  },
  {
    id: "login",
    name: "login",
    icon: LogIn,
    link: "/components/login",
  },
  {
    id: "register",
    name: "register",
    icon: LogInIcon,
    link: "/components/register",
  },
];
