"use server";
import { KambingModel } from "@/src/interface/kambing";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllKambing() {
  const data = await prisma.kambing.findMany({
    orderBy: { createdAt: "desc" },
  });

  return { status: 200, data };
}

export async function getKambingById(id: string) {
  const data = await prisma.kambing.findUnique({ where: { id } });
  return { status: 200, data };
}

export async function deleteKambing(id: string) {
  const data = await prisma.kambing.delete({ where: { id } });
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
  imageUrl: formData.imageUrl || null,
  imageKey: formData.imageKey || null,
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

export async function updateKambing(id: string, formData: KambingModel) {
  if (!id) {
    return { status: 400, message: "Kode Kambing diperlukan!" };
  }

  const existingKambing = await prisma.kambing.findUnique({
    where: { id },
  });

  if (!existingKambing) {
    return { status: 404, message: "Kode kambing tidak ditemukan" };
  }

  const updateKambing = await prisma.kambing.update({
    where: { id },
    data: {
      ...parseKambingData(formData),
    },
  });

  return {
    status: 200,
    data: updateKambing,
    message: "Data kambing berhasil di ubah!",
  };
}
