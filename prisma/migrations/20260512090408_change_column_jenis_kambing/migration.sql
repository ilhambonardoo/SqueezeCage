/*
  Warnings:

  - You are about to drop the column `jenis_kambing` on the `Kambing` table. All the data in the column will be lost.
  - Added the required column `jenis_hewan` to the `Kambing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisHewan" AS ENUM ('DOMBA', 'KAMBING');

-- AlterTable
ALTER TABLE "Kambing" DROP COLUMN "jenis_kambing",
ADD COLUMN     "jenis_hewan" "JenisHewan" NOT NULL;
