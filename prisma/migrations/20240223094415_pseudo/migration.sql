/*
  Warnings:

  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "pseudo" SET DATA TYPE VARCHAR(12);
