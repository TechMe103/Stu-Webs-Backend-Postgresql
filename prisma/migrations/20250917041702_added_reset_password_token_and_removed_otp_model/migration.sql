/*
  Warnings:

  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Admission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Otp" DROP CONSTRAINT "Otp_adminId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Otp" DROP CONSTRAINT "Otp_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."Admin" ADD COLUMN     "resetPasswordToken" TEXT;

-- AlterTable
ALTER TABLE "public"."Admission" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "resetPasswordToken" TEXT;

-- DropTable
DROP TABLE "public"."Otp";
