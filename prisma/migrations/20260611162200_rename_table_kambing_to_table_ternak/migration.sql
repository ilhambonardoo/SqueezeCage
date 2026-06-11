/*
  Warnings:

  - You are about to drop the column `kambingId` on the `RiwayatBerat` table. All the data in the column will be lost.
  - You are about to drop the `Kambing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ternakId` to the `RiwayatBerat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Kambing" DROP CONSTRAINT "Kambing_userId_fkey";

-- DropForeignKey
ALTER TABLE "RiwayatBerat" DROP CONSTRAINT "RiwayatBerat_kambingId_fkey";

-- AlterTable
ALTER TABLE "RiwayatBerat" DROP COLUMN "kambingId",
ADD COLUMN     "ternakId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Kambing";

-- CreateTable
CREATE TABLE "Ternak" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "kode_hewan" TEXT NOT NULL,
    "beratAwal" DOUBLE PRECISION NOT NULL,
    "jenis_kelamin" "JenisKelamin",
    "tgl_lahir" TIMESTAMP(3),
    "tgl_Masuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "beratAkhir" DOUBLE PRECISION NOT NULL,
    "statusHamil" "StatusKehamilan",
    "umur" INTEGER NOT NULL,
    "jenis_hewan" "JenisHewan" NOT NULL,
    "imageKey" TEXT,
    "imageUrl" TEXT,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Ternak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ternak_kode_hewan_key" ON "Ternak"("kode_hewan");

-- AddForeignKey
ALTER TABLE "Ternak" ADD CONSTRAINT "Ternak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiwayatBerat" ADD CONSTRAINT "RiwayatBerat_ternakId_fkey" FOREIGN KEY ("ternakId") REFERENCES "Ternak"("id") ON DELETE CASCADE ON UPDATE CASCADE;
