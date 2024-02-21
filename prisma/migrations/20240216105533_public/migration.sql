/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";
