import {
  List,
  User2Icon,
  LayoutDashboard,
  Beef,
  UserCircle,
  Plus,
} from "lucide-react";

import { IoScaleSharp } from "react-icons/io5";

export const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "OPERATOR"],
  },

  {
    title: "Ternak",
    icon: Beef,
    children: [
      { title: "Daftar Ternak", href: "/ternak", icon: List },
      { title: "Tambah Ternak", href: "/ternak/create", icon: Plus },
    ],
    roles: ["ADMIN", "OPERATOR"],
  },

  {
    title: "Timbangan",
    href: "/timbangan",
    icon: IoScaleSharp,
    roles: ["ADMIN", "OPERATOR"],
  },

  {
    title: "Profil",
    href: "/profile",
    icon: UserCircle,
    roles: ["ADMIN", "OPERATOR"],
  },
  {
    title: "Manajemen Users",
    href: "/users",
    icon: User2Icon,
    roles: ["ADMIN"],
  },
];
