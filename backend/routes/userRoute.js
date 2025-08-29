import express from "express";
import {register, verifyEmail, getByEmail, login, changeRole, logout } from "../controllers/userController.js";

import { requireAuth, verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.get('/verify/:token', verifyEmail);
router.post('/getByEmail', verifyToken, getByEmail);
router.post('/login', login);
router.put('/changeRole', verifyToken, changeRole);
router.get('/logout', requireAuth, logout);

export default router;