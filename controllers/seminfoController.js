const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ---------------- ADD SEMESTER INFO ----------------
const addSemInfo = async (req, res) => {
  try {
    const semInfo = await prisma.semesterInfo.create({
      data: {
        studentId: req.body.studentId, // must be sent from frontend
        semester: req.body.semester,
        attendance: req.body.attendance,
        kts: req.body.kts ? JSON.parse(JSON.stringify(req.body.kts)) : undefined,
        isDefaulter: req.body.isDefaulter ?? false,

        // Nested create for marks if provided
        marks: req.body.marks
          ? {
              create: req.body.marks.map((m) => ({
                subject: m.subject,
                score: m.score,
                outOf: m.outOf,
              })),
            }
          : undefined,
      },
      include: {
        marks: true,
      },
    });

    res.status(201).json(semInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET SEMESTER INFO BY STUDENT ----------------
const getSemInfoByStu = async (req, res) => {
  try {
    const semData = await prisma.semesterInfo.findMany({
      where: { studentId: Number(req.params.stuID) },
      include: {
        student: {
          select: {
            firstName: true,
            middleName: true,
            lastName: true,
            personalDetails: { select: { branch: true } },
          },
        },
        marks: true,
      },
    });

    res.json(semData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- UPDATE SEMESTER INFO ----------------
const updateSemInfo = async (req, res) => {
  try {
    const semInfo = await prisma.semesterInfo.update({
      where: { id: Number(req.params.id) },
      data: {
        semester: req.body.semester,
        attendance: req.body.attendance,
        kts: req.body.kts ? JSON.parse(JSON.stringify(req.body.kts)) : undefined,
        isDefaulter: req.body.isDefaulter,

        // Replace marks if new ones are provided
        marks: req.body.marks
          ? {
              deleteMany: {}, // clear old marks
              create: req.body.marks.map((m) => ({
                subject: m.subject,
                score: m.score,
                outOf: m.outOf,
              })),
            }
          : undefined,
      },
      include: {
        marks: true,
      },
    });

    res.json(semInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addSemInfo, getSemInfoByStu, updateSemInfo };
