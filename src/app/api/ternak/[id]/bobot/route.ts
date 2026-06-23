import { prisma } from "@/src/lib/prisma";
import { serverError } from "@/src/utils/api-helper";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const ternak = await prisma.ternak.findUnique({
      where: { id },
    });

    if (!ternak) {
      return NextResponse.json(
        { status: "error", message: "Hewan ternak tidak ditemukan" },
        { status: 404 },
      );
    }

    const umurBulanSekarang = Number(ternak.umur);
    const umurBulanDepan = umurBulanSekarang + 1;

    let bobotBulanDepan = 0;

    try {
      const jenisHewanFormatted =
        ternak.jenis_hewan.charAt(0).toUpperCase() +
        ternak.jenis_hewan.slice(1).toLowerCase();

      const urlApi = `${process.env.NEXT_PUBLIC_FASTAPI_URL || "http://127.0.0.1:8000"}`;
      const restApi = await fetch(`${urlApi}/prediksi-bobot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          umur_bulan: umurBulanSekarang,
          jenis_hewan: jenisHewanFormatted,
        }),
      });

      const dataML = await restApi.json();

      if (dataML.status === "success") {
        bobotBulanDepan = dataML.bobot_hewan.berat_aktual;
      }
    } catch {
      console.warn("Gagal mengambil prediksi ML, menggunakan fallback bobot 0");
    }

    let klasifikasi = "Ideal";
    let butuhPerhatian = false;
    let pesanNotifikasi = "";

    const bobotSekarang = Number(ternak?.beratAkhir) || 0;

    if (bobotSekarang < 15) {
      klasifikasi = "Terlalu Kurus";
      butuhPerhatian = true;
      pesanNotifikasi =
        "Kondisi ternak terindikasi malnutrisi (terlalu kurus). Segera tingkatkan porsi konsentrat dan lakukan pengecekan kondisi ternak.";
    } else if (bobotSekarang > 75) {
      klasifikasi = "Terlalu Gendut (Obesitas)";
      butuhPerhatian = true;
      pesanNotifikasi =
        "Kondisi ternak terindikasi mengalami obesitas. Mohon lakukan penyesuaian ransum dengan mengurangi porsi karbohidrat atau konsentrat sesuai rekomendasi pemberian pakan.";
    }

    const trenGrafik = [
      {
        bulan: `Bulan ${umurBulanSekarang - 2}`,
        bobot: Math.max(5, bobotSekarang - 6),
      },
      {
        bulan: `Bulan ${umurBulanSekarang - 1}`,
        bobot: Math.max(5, bobotSekarang - 3),
      },
      { bulan: `Sekarang (Bln ${umurBulanSekarang})`, bobot: bobotSekarang },
      { bulan: `Prediksi (Bln ${umurBulanDepan})`, bobot: bobotBulanDepan },
    ];

    return NextResponse.json({
      status: "success",
      detailTernak: {
        kode_hewan: ternak.kode_hewan,
        nama: ternak.nama,
        beratAkhir: bobotSekarang,
        umur: umurBulanSekarang,
      },
      prediksi: {
        bobotBulanDepan,
        klasifikasi,
        butuhPerhatian,
        pesanNotifikasi,
      },
      trenGrafik,
    });
  } catch (error) {
    serverError(error);
  }
}
