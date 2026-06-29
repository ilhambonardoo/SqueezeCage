import { revalidatePath } from "next/cache";
import { CreateSekatInput, SekatPayload } from "../interface/kandang-sekat";
import { prisma } from "../lib/prisma";
import { KandangSekatValidation } from "../lib/validation/kandang-sekat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getSekatList() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { status: 401, message: "Unauthorized" };
  }

  const data = await prisma.sekat.findMany({
    include: { kandang: true },
    orderBy: { kodeSekat: "asc" },
  });

  return { data, status: 200 };
}

export async function createSekat(input: CreateSekatInput) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { status: 401, message: "Unauthorized" };
  }

  const validation = KandangSekatValidation.SekatSchema.safeParse(input);

  if (!validation.success) {
    return { status: 400, message: validation.error.issues[0].message };
  }

  const exists = await prisma.sekat.findUnique({
    where: { kodeSekat: validation.data.kodeSekat },
  });

  if (exists) {
    return { status: 409, message: "Kode sekat sudah digunakan!" };
  }

  const data = await prisma.sekat.create({
    data: validation.data,
  });

  revalidatePath("/kandang-sekat");

  return { data, message: "Sekat berhasil ditambahkan", status: 201 };
}

export async function updateSekat(id: string, input: SekatPayload) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { status: 401, message: "Unauthorized" };
  }

  const validation = KandangSekatValidation.SekatSchema.safeParse(input);

  if (!validation.success) {
    return { status: 400, message: validation.error.issues[0].message };
  }

  const targetKandang = await prisma.kandang.findUnique({
    where: { id: input.kandangId },
  });

  if (!targetKandang) {
    return { status: 404, message: "Kandang tujuan tidak ditemukan" };
  }

  const duplicateKodeSekat = await prisma.sekat.findFirst({
    where: {
      kodeSekat: validation.data.kodeSekat,
      NOT: {
        id: id,
      },
    },
  });

  if (duplicateKodeSekat) {
    return {
      status: 409,
      message: "Kode sekat sudah digunakan oleh ruangan lain!",
    };
  }

  const data = await prisma.sekat.update({
    where: {
      id,
    },
    data: {
      kandangId: input.kandangId,
      kodeSekat: input.kodeSekat,
      keteranganSekat: input.keteranganSekat,
    },
  });

  revalidatePath("/kandang-sekat");

  return { data, message: "Data sekat berhasil diubah", status: 200 };
}

export async function deleteSekat(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { status: 401, message: "Unauthorized" };
  }

  const existing = await prisma.sekat.findUnique({ where: { id } });
  if (!existing) {
    return { status: 404, message: "Sekat tidak ditemukan" };
  }

  const data = await prisma.sekat.delete({
    where: { id },
  });

  revalidatePath("/kandang");

  return { data, message: "Sekat berhasil dihapus", status: 200 };
}
