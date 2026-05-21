import {
  List,
  User2Icon,
  LayoutDashboard,
  Beef,
  UserCircle,
} from "lucide-react";

import { IoScaleSharp } from "react-icons/io5";

export const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Kambing",
    icon: Beef,
    children: [{ title: "Daftar Kambing", href: "/kambing", icon: List }],
  },

  {
    title: "Timbangan",
    href: "/timbangan",
    icon: IoScaleSharp,
  },

  {
    title: "Profil",
    href: "/profile",
    icon: UserCircle,
  },
  {
    title: "Manajemen Users",
    href: "/users",
    icon: User2Icon,
  },
];
