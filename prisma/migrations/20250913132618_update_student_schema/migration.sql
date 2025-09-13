/*
  Warnings:

  - You are about to drop the column `bloodGroup` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `branch` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `currentCity` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `currentPincode` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `currentStreet` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `enrollmentNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `nativeCity` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `nativePincode` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `nativeStreet` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `parentMobileNo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentPhoto` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[PRN]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `PRN` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoURL` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Student_enrollmentNo_key";

-- AlterTable
ALTER TABLE "public"."Student" DROP COLUMN "bloodGroup",
DROP COLUMN "branch",
DROP COLUMN "category",
DROP COLUMN "currentCity",
DROP COLUMN "currentPincode",
DROP COLUMN "currentStreet",
DROP COLUMN "dob",
DROP COLUMN "enrollmentNo",
DROP COLUMN "mobileNo",
DROP COLUMN "nativeCity",
DROP COLUMN "nativePincode",
DROP COLUMN "nativeStreet",
DROP COLUMN "parentMobileNo",
DROP COLUMN "studentPhoto",
ADD COLUMN     "PRN" TEXT NOT NULL,
ADD COLUMN     "photoURL" TEXT NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."PersonalDetails" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "branch" TEXT,
    "dob" TIMESTAMP(3),
    "bloodGroup" TEXT,
    "currentStreet" TEXT,
    "currentCity" TEXT NOT NULL,
    "currentPincode" TEXT,
    "nativeStreet" TEXT,
    "nativeCity" TEXT NOT NULL,
    "nativePincode" TEXT,
    "category" TEXT,
    "mobileNo" TEXT NOT NULL,
    "parentMobileNo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_studentId_key" ON "public"."PersonalDetails"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_PRN_key" ON "public"."Student"("PRN");

-- AddForeignKey
ALTER TABLE "public"."PersonalDetails" ADD CONSTRAINT "PersonalDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
