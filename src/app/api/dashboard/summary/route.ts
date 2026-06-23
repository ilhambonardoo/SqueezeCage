import { prisma } from "@/src/lib/prisma";
import { serverError } from "@/src/utils/api-helper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const statsPerJenis = await prisma.ternak.groupBy({
      by: ["jenis_hewan"],
      _avg: {
        beratAkhir: true,
      },
      _count: {
        id: true,
      },
    });

    const riwayatBeratRaw = await prisma.riwayatBerat.findMany({
      take: 10,
      orderBy: {
        tgl_cek: "asc",
      },
      include: {
        ternak: {
          select: { jenis_hewan: true },
        },
      },
    });

    const chartData = riwayatBeratRaw.map((r) => ({
      tanggal: new Date(r.tgl_cek).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      }),
      berat: r.berat,
      jenis: r.ternak.jenis_hewan,
    }));

    const summaryData = {
      KAMBING: { total: 0, rata_rata_berat: 0, prediksi_bobot_total: 0 },
      DOMBA: { total: 0, rata_rata_berat: 0, prediksi_bobot_total: 0 },
    };

    statsPerJenis.forEach((item) => {
      if (item.jenis_hewan === "KAMBING" || item.jenis_hewan === "DOMBA") {
        summaryData[item.jenis_hewan].total = item._count.id || 0;
        summaryData[item.jenis_hewan].rata_rata_berat = Number(
          (item._avg.beratAkhir || 0).toFixed(2),
        );
      }
    });

    const semuaTernak = await prisma.ternak.findMany({
      select: {
        jenis_hewan: true,
        umur: true,
      },
    });

    if (semuaTernak.length > 0) {
      const kambingList = semuaTernak
        .filter((t) => t.jenis_hewan === "KAMBING")
        .map((t) => ({
          umur_bulan: Number(t.umur) || 0,
          jenis_hewan: "Kambing",
        }));
      const dombaList = semuaTernak
        .filter((t) => t.jenis_hewan === "DOMBA")
        .map((t) => ({
          umur_bulan: Number(t.umur) || 0,
          jenis_hewan: "Domba",
        }));

      const urlApi = `${process.env.NEXT_PUBLIC_FASTAPI_URL || "http://127.0.0.1:8000"}`;

      if (kambingList.length > 0) {
        const resKambing = await fetch(`${urlApi}/prediksi-bobot-kelompok`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ternak_list: kambingList }),
        });
        if (resKambing.ok) {
          const data = await resKambing.json();
          const total =
            typeof data?.total_bobot_prediksi === "number"
              ? data.total_bobot_prediksi
              : 0;
          summaryData.KAMBING.prediksi_bobot_total = total;
          if (typeof data?.total_bobot_prediksi !== "number") {
            console.warn(
              "Prediksi bobot kambing dikembalikan tanpa total_bobot_prediksi yang valid",
              data,
            );
          }
        } else {
          console.warn(
            "Prediksi bobot kambing gagal:",
            resKambing.status,
            await resKambing.text(),
          );
        }
      }

      if (dombaList.length > 0) {
        const resDomba = await fetch(`${urlApi}/prediksi-bobot-kelompok`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ternak_list: dombaList }),
        });
        if (resDomba.ok) {
          const data = await resDomba.json();
          const total =
            typeof data?.total_bobot_prediksi === "number"
              ? data.total_bobot_prediksi
              : 0;
          summaryData.DOMBA.prediksi_bobot_total = total;
          if (typeof data?.total_bobot_prediksi !== "number") {
            console.warn(
              "Prediksi bobot domba dikembalikan tanpa total_bobot_prediksi yang valid",
              data,
            );
          }
        } else {
          console.warn(
            "Prediksi bobot domba gagal:",
            resDomba.status,
            await resDomba.text(),
          );
        }
      }
    }

    return NextResponse.json(
      {
        status: "success",
        data: summaryData,
        chartData: chartData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Gagal memproses summary dashboard:", error);
    serverError(error);
  }
}
