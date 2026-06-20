/*
  Warnings:

  - You are about to drop the column `tgl_Masuk` on the `Ternak` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProgramTernak" AS ENUM ('FATTENING', 'BREEDING');

-- CreateEnum
CREATE TYPE "KeteranganSekat" AS ENUM ('INDIVIDU', 'KOLONI');

-- AlterTable
ALTER TABLE "Ternak" DROP COLUMN "tgl_Masuk",
ADD COLUMN     "programTernak" "ProgramTernak",
ADD COLUMN     "sekatId" TEXT,
ADD COLUMN     "tgl_masuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Sekat" (
    "id" TEXT NOT NULL,
    "kodeSekat" TEXT NOT NULL,
    "keteranganSekat" "KeteranganSekat" NOT NULL DEFAULT 'INDIVIDU',
    "kandangId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sekat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kandang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kandang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sekat_kodeSekat_key" ON "Sekat"("kodeSekat");

-- CreateIndex
CREATE UNIQUE INDEX "Kandang_nama_key" ON "Kandang"("nama");

-- AddForeignKey
ALTER TABLE "Ternak" ADD CONSTRAINT "Ternak_sekatId_fkey" FOREIGN KEY ("sekatId") REFERENCES "Sekat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sekat" ADD CONSTRAINT "Sekat_kandangId_fkey" FOREIGN KEY ("kandangId") REFERENCES "Kandang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
