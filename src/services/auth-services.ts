"use server";

import { prisma } from "@/src/lib/prisma";
import { AuthModelRegister } from "../interface/auth";
import { hash } from "bcryptjs";

export async function register(formData: AuthModelRegister) {
  const { nama, username, email, password } = formData;

  if (!nama || !username || !email || !password) {
    return { status: 400, message: "Semua field wajib diisi!" };
  }

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    return { status: 409, message: "Email sudah terdaftar!" };
  }

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return { status: 409, message: "Username sudah terdaftar!" };
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      nama: nama,
      email: email,
      username: username,
      password: hashedPassword,
      role: "OPERATOR",
    },
  });

  return { status: 201, message: "Registrasi Berhasil!", user };
}
