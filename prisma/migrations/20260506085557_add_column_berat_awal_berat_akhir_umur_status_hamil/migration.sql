/*
  Warnings:

  - Added the required column `beratAkhir` to the `Kambing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `umur` to the `Kambing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusKehamilan" AS ENUM ('HAMIL', 'TIDAK_HAMIL');

-- AlterTable
ALTER TABLE "Kambing" ADD COLUMN     "beratAkhir" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "statusHamil" "StatusKehamilan",
ADD COLUMN     "umur" INTEGER NOT NULL;
