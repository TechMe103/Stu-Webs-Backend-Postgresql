const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ---------------- CREATE ----------------
const createAchievement = async (req, res) => {
  try {
    const achievement = await prisma.achievement.create({
      data: {
        studentId: req.body.studentId, // make sure frontend sends studentId
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        issuedBy: req.body.issuedBy,
        fromDate: new Date(req.body.fromDate),
        toDate: new Date(req.body.toDate),
        achievementType: req.body.achievementType,
        teamMembers: req.body.teamMembers ? JSON.parse(JSON.stringify(req.body.teamMembers)) : undefined,
        eventPhoto: req.body.eventPhoto,
        certificateURL: req.body.certificateURL,
      },
    });

    res.status(201).json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET BY STUDENT ----------------
const getAchievementByStu = async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany({
      where: { studentId: Number(req.params.stuID) },
      include: {
        student: {
          select: {
            firstName: true,
            middleName: true,
            lastName: true,
            personalDetails: {
              select: { branch: true },
            },
          },
        },
      },
    });

    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- UPDATE ----------------
const updateAchievement = async (req, res) => {
  try {
    const achievement = await prisma.achievement.update({
      where: { id: Number(req.params.id) },
      data: {
        ...req.body,
        fromDate: req.body.fromDate ? new Date(req.body.fromDate) : undefined,
        toDate: req.body.toDate ? new Date(req.body.toDate) : undefined,
        teamMembers: req.body.teamMembers
          ? JSON.parse(JSON.stringify(req.body.teamMembers))
          : undefined,
      },
    });

    res.json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------- DELETE ----------------
const deleteAchievement = async (req, res) => {
  try {
    await prisma.achievement.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Achievement successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAchievement,
  getAchievementByStu,
  updateAchievement,
  deleteAchievement,
};
