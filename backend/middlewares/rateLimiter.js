import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  limit: 100, 
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    message: "Trop de tentatives de connexion. Réessayez dans 2 minutes.",
  },
});

export default authLimiter