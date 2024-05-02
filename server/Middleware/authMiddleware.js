// authMiddleware.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors'; // Import cors package

router.use(cors()); // Apply cors middleware to router

dotenv.config();
const secretOrPrivateKey = process.env.SECRET_KEY;

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, secretOrPrivateKey);
        req.userId = decoded.userId; // Attach userId to the request for further use
        next();
    } catch (err) {
        console.error('Error verifying user:', err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please login again' });
        }
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
