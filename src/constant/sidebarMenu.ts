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
    title: "Kambing",
    icon: Beef,
    children: [
      { title: "Daftar Kambing", href: "/kambing", icon: List },
      { title: "Tambah Kambing", href: "/kambing/create", icon: Plus },
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
