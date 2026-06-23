import { prisma } from "@/src/lib/prisma";
import { serverError } from "@/src/utils/api-helper";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const daftarTernak = await prisma.ternak.findMany({
      where: { sekatId: id },
    });

    if (daftarTernak.length === 0) {
      return NextResponse.json({
        status: "success",
        daftarHewan: [],
        totalHijauan: 0,
        totalKonsentrat: 0,
      });
    }

    const hasilPrediksiList = await Promise.all(
      daftarTernak.map(async (ternak) => {
        const statusHamil = ternak.statusHamil;
        const umur = ternak.umur;
        const statusMenyusui = ternak.statusMenyusui;

        let statusFisiologi = "Dewasa Maintanance";

        if (statusHamil === "HAMIL") {
          statusFisiologi = "Hamil";
        } else if (statusMenyusui === "MENYUSUI") {
          statusFisiologi = "Menyusui";
        } else if (umur < 12) {
          statusFisiologi = "Pertumbuhan";
        }

        try {
          const jenisHewanFormatted =
            ternak.jenis_hewan.charAt(0).toUpperCase() +
            ternak.jenis_hewan.slice(1).toLocaleLowerCase();

          const urlApi = `${process.env.NEXT_PUBLIC_FASTAPI_URL || "http://127.0.0.1:8000"}`;

          const resFastAPI = await fetch(`${urlApi}/prediksi-pakan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jenis_hewan: jenisHewanFormatted,
              umur_bulan: Number(ternak.umur),
              berat_aktual: Number(ternak.beratAkhir),
              status_fisiologi: statusFisiologi,
            }),
          });

          const dataML = await resFastAPI.json();

          return {
            kode_hewan: ternak.kode_hewan,
            nama: ternak.nama,
            jenis_hewan: ternak.jenis_hewan,
            status_fisiologis: statusFisiologi,
            target_hijauan: dataML.rekomendasi_pakan?.target_hijauan || 0,
            target_konsentrat: dataML.rekomendasi_pakan?.target_konsentrat || 0,
          };
        } catch {
          return {
            kode_hewan: ternak.kode_hewan,
            nama: ternak.nama,
            jenis_hewan: ternak.jenis_hewan,
            target_hijauan: 0,
            target_konsentrat: 0,
          };
        }
      }),
    );

    const totalHijauan = hasilPrediksiList.reduce(
      (sum, item) => sum + item.target_hijauan,
      0,
    );
    const totalKonsentrat = hasilPrediksiList.reduce(
      (sum, item) => sum + item.target_konsentrat,
      0,
    );

    return NextResponse.json({
      status: "success",
      daftarHewan: hasilPrediksiList,
      totalHijauan: Number(totalHijauan.toFixed(2)),
      totalKonsentrat: Number(totalKonsentrat.toFixed(2)),
    });
  } catch (error) {
    return serverError(error);
  }
}
