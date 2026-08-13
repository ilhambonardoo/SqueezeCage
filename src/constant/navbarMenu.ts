import { Book, CircleQuestionMark, Home, InfoIcon } from "lucide-react";

export const menuItems = [
  {
    id: 1,
    nama: "Kandang",
    icon: Home,
    href: "/",
  },
  {
    id: 2,
    nama: "Tentang",
    icon: InfoIcon,
    href: "/about",
  },
  {
    id: 3,
    nama: "Panduan",
    icon: Book,
    href: "/guide",
  },
  {
    id: 4,
    nama: "FaQ",
    icon: CircleQuestionMark,
    href: "/questions",
  },
];
