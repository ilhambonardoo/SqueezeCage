import { Role } from "../generated/prisma/browser";

export interface AuthModelRegister {
  nama: string;
  username: string;
  email: string;
  password: string;
}

export interface UserModel {
  id: string;
  nama: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  image: string;
}
