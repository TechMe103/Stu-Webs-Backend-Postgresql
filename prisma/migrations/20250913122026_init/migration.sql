-- CreateTable
CREATE TABLE "public"."Student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
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
    "email" TEXT NOT NULL,
    "password" TEXT,
    "mobileNo" TEXT NOT NULL,
    "parentMobileNo" TEXT NOT NULL,
    "studentPhoto" TEXT NOT NULL,
    "enrollmentNo" TEXT NOT NULL,
    "stuID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admission" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "rollno" TEXT,
    "year" TEXT,
    "div" TEXT,
    "course" TEXT NOT NULL,
    "admissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "fees" DOUBLE PRECISION NOT NULL,
    "isFeesPaid" BOOLEAN NOT NULL DEFAULT false,
    "isScholarshipApplied" BOOLEAN NOT NULL DEFAULT false,
    "academicYear" TEXT NOT NULL,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "public"."Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_enrollmentNo_key" ON "public"."Student"("enrollmentNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_stuID_key" ON "public"."Student"("stuID");

-- AddForeignKey
ALTER TABLE "public"."Admission" ADD CONSTRAINT "Admission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
