"use server";
import { revalidatePath } from "next/cache";
import { CreateKandangInput } from "../interface/kandang-sekat";
import { prisma } from "../lib/prisma";
import { KandangSekatValidation } from "../lib/validation/kandang-sekat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getAllKandang() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { status: 401, message: "Unauthorized" };
  }
  const data = await prisma.kandang.findMany({
    include: { sekatList: true },
    orderBy: { nama: "asc" },
  });

  return { data, status: 200 };
}

export async function getAllKandangWithSekat() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { status: 401, message: "Unauthorized" };
  }

  const data = await prisma.kandang.findMany({
    include: {
      sekatList: true,
    },
  });
  return { status: 200, data };
}

export async function createKandang(input: CreateKandangInput) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { status: 401, message: "Unauthorized" };
  }

  const validation = KandangSekatValidation.KandangSchema.safeParse(input);

  if (!validation.success) {
    return { status: 400, message: validation.error.issues[0].message };
  }

  const exists = await prisma.kandang.findUnique({
    where: { nama: validation.data.nama },
  });
  if (exists) return { status: 409, message: "Nama kandang sudah digunakan!" };

  const data = await prisma.kandang.create({
    data: validation.data,
  });

  if (!data) {
    return { status: 404, message: "Data tidak ditemukan" };
  }

  revalidatePath("/kandang");

  return { data, message: "Kandang berhasil dibuat", status: 201 };
}

export async function updateKandang(id: string, input: CreateKandangInput) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { status: 401, message: "Unauthorized" };
  }

  const validation = KandangSekatValidation.KandangSchema.safeParse(input);

  if (!validation.success) {
    return { status: 400, message: validation.error.issues[0].message };
  }

  const exists = await prisma.kandang.findUnique({
    where: { nama: validation.data.nama },
  });
  if (exists) return { status: 409, message: "Nama kandang sudah digunakan!" };

  const data = await prisma.kandang.update({
    where: { id },
    data: {
      ...input,
    },
  });

  revalidatePath("/kandang-sekat");

  return {
    data,
    message: "Data berhasil diubah",
    status: 200,
  };
}

export async function deleteKandang(id: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { status: 401, message: "Unauthorized" };
  }

  const existing = await prisma.kandang.findUnique({ where: { id } });

  if (!existing) {
    return { message: "Data tidak ditemukan", status: 404 };
  }

  const data = await prisma.kandang.delete({
    where: { id },
  });

  revalidatePath("/kandang");

  return { data, message: "Data berhasil dihapus", status: 200 };
}
