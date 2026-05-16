/*
  Warnings:

  - Added the required column `nama` to the `Kambing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kambing" ADD COLUMN     "imageKey" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "nama" TEXT NOT NULL;
