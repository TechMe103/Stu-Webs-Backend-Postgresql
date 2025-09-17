const prisma = require('../prismaClient.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring=require('randomstring');
const nodemailer=require('nodemailer');

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
		return res.status(500).json({success: false, message: "Internal Server Error. Please try again later."});
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
		return res.status(500).json({success: false, message: "Internal Server Error. Please try again later."});
	}
};

// ---------------- ADMIN LOGIN ----------------
exports.adminLogin = async (req, res) => {
	try {
		const { email, password, name } = req.body;

		const admin = await prisma.admin.findUnique({ where: { email } });
		if (!admin) return res.status(400).json({success: false,  message: 'Invalid credentials' });

		const match = await bcrypt.compare(password, admin.password);
		if (!match) return res.status(400).json({ success: false, message: 'Invalid credentials' });

		const token = jwt.sign(
		{ id: admin.id, email: admin.email, role: admin.role },
		JWT_SECRET,
		{ expiresIn: '1d' }
		);

		res.cookie('token', token, cookieOptions);
		return res.status(200).json({ message: 'Admin login successful' });
	} catch (error) {
		console.error("Admin Login Error:", error);
		return res.status(500).json({success: false, message: "Internal Server Error. Please try again later."});
	}
};


exports.forgotPassword = async (req,res)=>{
	try {

		const email=req.body.email;

		const existingUser=await prisma.student.findUnique({
			where : {
				email:email
			}
		});

		if(!existingUser){
			return res.json({success: false, message: "This email is not registered. Please check and try again later."});
		}

		//generate random string

		//send email using nodemailer, usme route with token will be there

		//if any error in sending email then catch that, and dont sotre token in DB
		//if no error in sending mail, then store token in DB

		//also yaha pe automatic logout bhi ho jana chaiye.
		//fir reset password waale link pe password change hoga, then user can simply login again
		
	} catch (error) {
		return res.status(500).json({success: false, message: "Internal Server Error. Please try again later."});
	}

};

exports.resetPassword = async (req,res)=>{
	try {
		//get password form req.body, get userid also
		//then check received token in req.query with the token stored in DB,
		//if they are not same then send error
		//if they are same then change old password to newpassword received and send success message to frontend


	} catch (error) {
		return res.status(500).json({success: false, message: "Internal Server Error. Please try again later."});
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
		return res.status(500).json({success: false, message: "Internal Server Error. Please try again later."});
	}
};



