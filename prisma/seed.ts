import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  JenisKelamin,
  StatusKehamilan,
  JenisHewan,
} from "../src/generated/prisma/client";
import { hash } from "bcryptjs";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@iotechquila.com" },
    update: {},
    create: {
      email: "admin@iotechquila.com",
      nama: "Admin Iotechquila",
      username: "admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created or already exists");

  const ternakData = Array.from({ length: 20 }).map((_, i) => {
    const isDomba = i % 3 === 0;
    const isBetina = i % 2 === 0;
    const beratAwal = Math.floor(Math.random() * 10) + 10;
    const beratAkhir = beratAwal + Math.floor(Math.random() * 8);
    const kode = isDomba
      ? `DMB-${String(i + 1).padStart(3, "0")}`
      : `KBG-${String(i + 1).padStart(3, "0")}`;

    return {
      kode_hewan: kode,
      nama: `${isDomba ? "Domba" : "Kambing"} ${i + 1}`,
      beratAwal: beratAwal,
      beratAkhir: beratAkhir,
      jenis_kelamin: isBetina ? JenisKelamin.BETINA : JenisKelamin.JANTAN,
      tgl_lahir: new Date(
        2025,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      ),
      tgl_Masuk: new Date(2026, 0, Math.floor(Math.random() * 28) + 1),
      statusHamil:
        isBetina && i % 4 === 0
          ? StatusKehamilan.HAMIL
          : StatusKehamilan.TIDAK_HAMIL,
      umur: Math.floor(Math.random() * 24) + 6,
      jenis_hewan: isDomba ? JenisHewan.DOMBA : JenisHewan.KAMBING,
      userId: admin.id,
    };
  });

  console.log("Seeding 20 ternak data...");

  for (const item of ternakData) {
    const ternak = await prisma.ternak.upsert({
      where: { kode_hewan: item.kode_hewan },
      update: item,
      create: item,
    });

    await prisma.riwayatBerat.createMany({
      data: [
        {
          berat: item.beratAwal,
          ternakId: ternak.id,
          tgl_cek: item.tgl_Masuk,
        },
        {
          berat: item.beratAkhir,
          ternakId: ternak.id,
          tgl_cek: new Date(),
        },
      ],
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
