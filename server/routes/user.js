import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const secretOrPrivateKey = process.env.SECRET_KEY;

// Multer configuration for file upload

// Route for user signup
router.post("/signup", async (req, res) => {
  const {
    username,
    email,
    password,
    enrollmentNumber,
    branch,
    phoneNumber,
    collegeName,
    year,
    semester,
    isAdmin, // Include isAdmin field in request body
    secretId, // Include secretId field in request body
  } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      enrollmentNumber,
      branch,
      phoneNumber,
      collegeName,
      year,
      semester,
      isAdmin,
      secretId, // Save isAdmin and secretId
    });

    await newUser.save();

    return res.json({ status: true, message: "Record registered" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});


// Route for user login
router.post("/login", async (req, res) => {
  const { email, password, userType, secretId } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    if (user.userType === '1') {
      // Check if logging in as admin
      if (secretId !== user.secretId) {
        return res.status(401).json({ message: "Invalid secret ID" });
      }
    }

    const token = jwt.sign({ userId: user._id }, secretOrPrivateKey, {
      expiresIn: "1h",
    });

    // Setting the token in a cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    return res.json({ status: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for sending reset password email
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, secretOrPrivateKey, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send reset password email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `To reset your password, click on the following link: http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Email sent successfully" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for resetting user password
router.post("/reset-password/:token", async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, secretOrPrivateKey);
    const userId = decoded.userId;
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true } // To return the updated document
    );
    return res.json({ status: true, message: "Password reset successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Middleware to verify user authentication
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, secretOrPrivateKey);
    req.userId = decoded.userId; // Attach userId to the request for further use
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Route to verify user authentication
router.get("/verify", verifyUser, async (req, res) => {
  try {
    const userInfo = await UserModel.findById(req.userId);
    if (!userInfo) {
      console.log("User not found in the database");
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      status: true,
      message: "Authorized",
      userInfo: {
        username: userInfo.username,
        collegeName: userInfo.collegeName,
        branch: userInfo.branch,
        year: userInfo.year,
      },
    });
  } catch (error) {
    console.error("Error occurred while verifying user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to handle file upload (quiz upload)

// Route to handle user logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});





export default router;
