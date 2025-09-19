/*
  Warnings:

  - A unique constraint covering the columns `[resetPasswordToken]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resetPasswordToken]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_resetPasswordToken_key" ON "public"."Admin"("resetPasswordToken");

-- CreateIndex
CREATE UNIQUE INDEX "Student_resetPasswordToken_key" ON "public"."Student"("resetPasswordToken");
