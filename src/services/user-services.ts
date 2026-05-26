import { prisma } from "@/src/lib/prisma";
import { hash } from "bcryptjs";
import { UserModel } from "../generated/prisma/models";
import { Role } from "../generated/prisma/client";

export async function createUser(formData: UserModel) {
  const { nama, email, password, role, username } = formData;

  if (!nama || !email || !username || !password) {
    return { message: "Semua field harus diisi" };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return { status: 409, message: "Email sudah terdaftar!" };
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      nama,
      email,
      username,
      password: hashedPassword,
      role: role || "OPERATOR",
    },
  });

  return { status: 201, message: "User berhasil ditambahkan", user };
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      nama: true,
      email: true,
      username: true,
      role: true,
      image: true,
      createdAt: true,
    },
  });

  if (!users) {
    return { status: 404, message: "User tidak ditemukan!" };
  }

  return { status: 200, users };
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      nama: true,
      email: true,
      username: true,
      role: true,
    },
  });

  if (!user) {
    return { status: 404, message: "User tidak ditemukan!" };
  }

  return { status: 200, user };
}

export async function updateUser(
  id: string,
  formData: Partial<UserModel> & { image?: string | null },
) {
  const { nama, email, username, password, role, image } = formData;

  if (!nama || !username || !email) {
    return { status: 400, message: "Nama, Username, dan Email wajib diisi!" };
  }

  const data: {
    nama: string;
    email: string;
    username: string;
    image?: string | null;
    role?: Role;
    password?: string;
  } = {
    nama,
    email,
    username,
    image,
  };

  // Hanya update role jika dikirimkan (khusus manajemen user/admin)
  if (role) {
    data.role = role as Role;
  }

  if (password && password.trim() !== "") {
    data.password = await hash(password, 12);
  }

  const user = await prisma.user.update({
    where: { id },
    data,
  });

  if (!user) {
    return { status: 404, message: "Data tidak ditemukan!" };
  }

  return { status: 200, user };
}

export async function deleteUser(id: string) {
  const user = await prisma.user.delete({
    where: { id },
  });

  if (!user) {
    return { status: 404, message: "User tidak ditemukan!" };
  }

  return { status: 200, message: "User berhasil dihapus" };
}
