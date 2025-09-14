const prisma = require('../prismaClient.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const cookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24, // 1 day
  sameSite: 'lax',
};

// ---------------- SIGNUP ----------------
exports.signup = async (req, res) => {
  try {
    const { firstName, middleName, lastName, stuID, PRN, email, password } = req.body;

    // Check if Student exists
    const existing = await prisma.student.findUnique({ where: { stuID } });
    if (existing) return res.status(400).json({ error: 'Student already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Student
    const student = await prisma.student.create({
      data: { firstName, middleName, lastName, stuID, PRN, email, password: hashedPassword }
    });

    // Create JWT
    const token = jwt.sign({ id: student.id, stuID: student.stuID,  role : student.role }, JWT_SECRET, { expiresIn: '1d' });

    // Send JWT only in cookie
    res.cookie('token', token, cookieOptions);

    // Send response without token
    return res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  try {
    const { stuID, password } = req.body;

    const student = await prisma.student.findUnique({ where: { stuID } });
    if (!student) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: student.id, stuID: student.stuID, role : student.role }, JWT_SECRET, { expiresIn: '1d' });

    // Send JWT only in cookie
    res.cookie('token', token, cookieOptions);

    // Send response without token
    return res.status(200).json({ message: 'Login successful'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ---------------- ADMIN LOGIN ----------------
exports.adminLogin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, cookieOptions);
    return res.status(200).json({ message: 'Admin login successful' });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ---------------- LOGOUT ----------------
exports.logout = (req, res) => {
  try {
    // Clear the token cookie with same options
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error("Logout Error: ", err);
    return res.status(500).json({ message: "Internal Server Error. Please try again later." });
  }
};


