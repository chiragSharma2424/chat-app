import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getUsersForSidebar } from '../controllers/message.contoller.js';
import { getMessages } from '../controllers/message.contoller.js';
import { sendMessage } from '../controllers/message.contoller.js';

const router = express.Router();

router.get('/users', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;