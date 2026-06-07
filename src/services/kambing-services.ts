"use server";
import { KambingModel } from "@/src/interface/kambing";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function getAllKambing() {
  const data = await prisma.kambing.findMany({
    orderBy: { createdAt: "desc" },
  });

  return { status: 200, data };
}

export async function getKambingById(id: string) {
  const data = await prisma.kambing.findUnique({ where: { id } });
  return { status: 200, data, message: "Data berhasil ditemukan" };
}

export async function deleteKambing(id: string) {
  const existing = await prisma.kambing.findUnique({ where: { id } });

  if (!existing) {
    return { status: 404, message: "Data tidak ditemukan" };
  }

  const data = await prisma.kambing.delete({ where: { id } });

  if (existing.imageKey) {
    await utapi.deleteFiles(existing.imageKey);
  }

  return { status: 200, data, message: "Data berhasil dhapus" };
}

const parseKambingData = (formData: KambingModel) => ({
  kode_kambing: formData.kode_kambing,
  nama: formData.nama,
  beratAwal: Number(formData.beratAwal),
  beratAkhir: Number(formData.beratAkhir),
  umur: Number(formData.umur),
  tgl_lahir: formData.tgl_lahir ? new Date(formData.tgl_lahir) : null,
  jenis_hewan: formData.jenis_hewan as "DOMBA" | "KAMBING",
  jenis_kelamin: formData.jenis_kelamin as "JANTAN" | "BETINA",
  statusHamil:
    formData.jenis_kelamin === "BETINA" ? formData.statusHamil : null,
  imageUrl: formData.imageUrl === null ? null : formData.imageUrl || null,
  imageKey: formData.imageKey === null ? null : formData.imageKey || null,
});

export async function createKambing(formData: KambingModel) {
  const { kode_kambing, userId } = formData;

  if (!userId) return { status: 400, message: "User ID Wajib ada" };

  const existsingKambing = await prisma.kambing.findUnique({
    where: { kode_kambing },
  });

  if (existsingKambing) {
    return {
      status: 409,
      message: "Kambing dengan kode ini sudah terisis!",
    };
  }

  const kambing = await prisma.kambing.create({
    data: {
      userId: formData.userId,
      ...parseKambingData(formData),
    },
  });

  revalidatePath("/dashboard/kambing");

  return {
    status: 201,
    data: kambing,
    message: "Data kambing berhasil ditambahkan!",
  };
}

export async function updateKambing(
  id: string,
  formData: KambingModel,
  oldImageKeyToDelete?: string | null,
) {
  if (!id) {
    return { status: 400, message: "Kode Kambing diperlukan!" };
  }

  const existingKambing = await prisma.kambing.findUnique({
    where: { id },
  });

  if (!existingKambing) {
    return { status: 404, message: "Kode kambing tidak ditemukan" };
  }

  if (oldImageKeyToDelete) {
    try {
      await utapi.deleteFiles(oldImageKeyToDelete);
    } catch (error) {
      console.error("Gagal membersihkan file lama di database", error);
    }
  }

  const updateKambing = await prisma.kambing.update({
    where: { id },
    data: {
      ...parseKambingData(formData),
    },
  });

  revalidatePath("/kambing");

  return {
    status: 200,
    data: updateKambing,
    message: "Data kambing berhasil di ubah!",
  };
}

export async function deleteImage(key: string) {
  if (!key) return;

  await utapi.deleteFiles(key);

  return { success: true };
}

export async function getKambingStats() {
  const [totalKambing, perKelamin, perJenis] = await Promise.all([
    prisma.kambing.count(),
    prisma.kambing.groupBy({
      by: ["jenis_kelamin"],
      _count: { _all: true },
    }),
    prisma.kambing.groupBy({
      by: ["jenis_hewan"],
      _count: { _all: true },
    }),
  ]);

  const formattedData = {
    total: totalKambing,
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
    status: 201,
    message: "Statistik berhasi dimuat",
    data: formattedData,
  };
}
