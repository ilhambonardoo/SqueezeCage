/*
  Warnings:

  - You are about to drop the column `kode_kambing` on the `Kambing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kode_hewan]` on the table `Kambing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kode_hewan` to the `Kambing` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Kambing_kode_kambing_key";

-- AlterTable
ALTER TABLE "Kambing" DROP COLUMN "kode_kambing",
ADD COLUMN     "kode_hewan" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Kambing_kode_hewan_key" ON "Kambing"("kode_hewan");
