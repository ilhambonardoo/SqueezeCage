"use server";
import { authOptions } from "@/auth";
import { TernakModel } from "@/src/interface/ternak";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { TernakValidation } from "../lib/validation/ternak-validation";

const utapi = new UTApi();

export async function getAllTernak() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: "Unatuhotized", status: 401 };
  }

  const data = await prisma.ternak.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      sekat: {
        include: {
          kandang: true,
        },
      },
    },
  });

  return { status: 200, data };
}

export async function getTernakById(id: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: "Unatuhotized", status: 401 };
  }

  const data = await prisma.ternak.findUnique({
    where: { id },
    include: {
      sekat: {
        include: {
          kandang: true,
        },
      },
    },
  });
  return { status: 200, data, message: "Data berhasil ditemukan" };
}

export async function deleteTernak(id: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: "Unatuhotized", status: 401 };
  }

  const existing = await prisma.ternak.findUnique({ where: { id } });

  if (!existing) {
    return { status: 404, message: "Data tidak ditemukan" };
  }

  const data = await prisma.ternak.delete({
    where: { id },
  });

  if (existing.imageKey) {
    await utapi.deleteFiles(existing.imageKey);
  }

  return { status: 200, data, message: "Data berhasil dhapus" };
}

const parseTernakData = (formData: TernakModel) => ({
  kode_hewan: formData.kode_hewan,
  nama: formData.nama,
  beratAwal: Number(formData.beratAwal),
  beratAkhir: Number(formData.beratAkhir),
  umur: Number(formData.umur),
  tgl_lahir: formData.tgl_lahir ? new Date(formData.tgl_lahir) : null,
  jenis_hewan: formData.jenis_hewan as "DOMBA" | "KAMBING",
  jenis_kelamin: formData.jenis_kelamin as "JANTAN" | "BETINA",
  statusHamil:
    formData.jenis_kelamin === "BETINA" ? formData.statusHamil : null,
  statusMenyusui:
    formData.jenis_kelamin === "BETINA" ? formData.statusMenyusui : null,
  sekatId: formData.sekatId || null,
  programTernak: formData.programTernak ?? null,
  imageUrl: formData.imageUrl === null ? null : formData.imageUrl || null,
  imageKey: formData.imageKey === null ? null : formData.imageKey || null,
});

export async function createTernak(formData: TernakModel) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: "Unatuhotized", status: 401 };
  }

  const validation = TernakValidation.CREATE.safeParse(formData);

  if (!validation.success) {
    return { status: 400, message: validation.error.issues[0].message };
  }

  const { kode_hewan, userId } = formData;

  if (!userId) return { status: 400, message: "User ID Wajib ada" };

  const existsingTernak = await prisma.ternak.findUnique({
    where: { kode_hewan },
  });

  if (existsingTernak) {
    return {
      status: 409,
      message: "Ternak dengan kode ini sudah terisis!",
    };
  }

  const ternak = await prisma.ternak.create({
    data: {
      userId: formData.userId,
      ...parseTernakData(formData),
    },
  });

  revalidatePath("/ternak");

  return {
    status: 201,
    data: ternak,
    message: "Data ternak berhasil ditambahkan!",
  };
}

export async function updateTernak(
  id: string,
  formData: TernakModel,
  oldImageKeyToDelete?: string | null,
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: "Unatuhotized", status: 401 };
  }

  const validation = TernakValidation.UPDATE.safeParse(formData);

  if (!validation.success) {
    console.error("Validation errors: ", validation.error.issues);
    return { status: 400, message: validation.error.issues[0].message };
  }

  const existingTernak = await prisma.ternak.findUnique({
    where: { id },
  });

  if (!existingTernak) {
    return { status: 404, message: "Kode hewan tidak ditemukan" };
  }

  if (oldImageKeyToDelete) {
    try {
      await utapi.deleteFiles(oldImageKeyToDelete);
    } catch (error) {
      console.error("Gagal membersihkan file lama di database", error);
    }
  }

  const updateTernak = await prisma.ternak.update({
    where: { id },
    data: {
      ...parseTernakData(formData),
    },
  });

  revalidatePath("/ternak");

  return {
    status: 200,
    data: updateTernak,
    message: "Data ternak berhasil di ubah!",
  };
}

export async function deleteImage(key: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: "Unatuhotized", status: 401 };
  }

  if (!key) return;

  await utapi.deleteFiles(key);

  return { success: true };
}

export async function getTernakStats() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: "Unatuhotized", status: 401 };
  }

  const [totalTernak, perKelamin, perJenis] = await Promise.all([
    prisma.ternak.count(),
    prisma.ternak.groupBy({
      by: ["jenis_kelamin"],
      _count: { _all: true },
    }),
    prisma.ternak.groupBy({
      by: ["jenis_hewan"],
      _count: { _all: true },
    }),
  ]);

  const formattedData = {
    total: totalTernak,
    jantan:
      perKelamin.find((item) => item.jenis_kelamin === "JANTAN")?._count._all ||
      0,
    betina:
      perKelamin.find((item) => item.jenis_kelamin === "BETINA")?._count._all ||
      0,
    domba:
      perJenis.find((item) => item.jenis_hewan === "DOMBA")?._count._all || 0,
    kambing:
      perJenis.find((item) => item.jenis_hewan === "KAMBING")?._count._all || 0,
  };

  return {
    status: 200,
    message: "Statistik berhasi dimuat",
    data: formattedData,
  };
}
