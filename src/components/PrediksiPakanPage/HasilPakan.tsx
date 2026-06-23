import { Layers, Percent, Activity } from "lucide-react";
import { HewanPrediksiItem, PrediksiPakan } from "@/src/interface/prediksi";
import { useMounted } from "@/src/hooks/useMounted";

interface HasilPakanProps {
  dataPrediksi: PrediksiPakan | null;
  isLoading: boolean;
}

const HasilPakan = ({ dataPrediksi, isLoading }: HasilPakanProps) => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* HASIL OUTPUT PREDIKSI */}
      {dataPrediksi && !isLoading && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          {/* DAFTAR INDIVIDU HEWAN */}
          <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl p-6 shadow-sm dark:shadow-none transition-colors duration-300">
            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
              <Layers
                size={18}
                className="text-amber-600 dark:text-amber-500"
              />
              Daftar Hewan di Petak Ini
            </h3>

            {dataPrediksi.daftarHewan.length === 0 ? (
              <p className="text-neutral-400 dark:text-neutral-500 text-sm italic py-4">
                Tidak ada data ternak terdaftar di dalam sekat ruangan ini.
                Silakan atur atau edit lokasi kandang ternak terlebih dahulu.
              </p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30">
                <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {dataPrediksi.daftarHewan.map(
                    (hewan: HewanPrediksiItem, idx: number) => (
                      <li
                        key={hewan.kode_hewan}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-100/40 dark:hover:bg-neutral-900/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                              {hewan.kode_hewan}{" "}
                              <span className="font-normal text-neutral-500 dark:text-neutral-400">
                                ({hewan.nama})
                              </span>
                            </p>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5 mt-0.5">
                              <span className="uppercase font-medium">
                                {hewan.jenis_hewan}
                              </span>
                              <span>•</span>
                              <span className="text-amber-600 dark:text-amber-500 font-semibold flex items-center gap-0.5">
                                <Activity size={10} /> {hewan.status_fisiologi}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900/70 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 font-medium self-start sm:self-center shadow-xs dark:shadow-none">
                          💡 ML Predict:{" "}
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            Hijauan {hewan.target_hijauan} Kg
                          </span>
                          ,{" "}
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">
                            Konsentrat {hewan.target_konsentrat} Kg
                          </span>
                        </div>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* TOTAL GABUNGAN FORMULA PAKAN */}
          {dataPrediksi.daftarHewan.length > 0 && (
            <div className="bg-linear-to-br from-amber-50 to-neutral-50 dark:from-amber-950/20 dark:to-neutral-900/50 border border-amber-200 dark:border-amber-900/30 p-6 rounded-2xl shadow-sm dark:shadow-md transition-colors duration-300">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Percent size={16} />
                TOTAL PAKAN UNTUK SEKAT (DIHASILKAN OTOMATIS OLEH SISTEM)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl flex flex-col gap-1 transition-colors duration-300">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    🌾 Total Hijauan
                  </span>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {dataPrediksi.totalHijauan}{" "}
                    <span className="text-sm font-normal text-neutral-400 dark:text-neutral-500 ml-0.5">
                      Kg
                    </span>
                  </p>
                </div>
                <div className="bg-white dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl flex flex-col gap-1 transition-colors duration-300">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    🟤 Total Konsentrat
                  </span>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {dataPrediksi.totalKonsentrat}{" "}
                    <span className="text-sm font-normal text-neutral-400 dark:text-neutral-500 ml-0.5">
                      Kg
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HasilPakan;
