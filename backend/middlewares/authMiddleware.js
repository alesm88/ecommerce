import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

  if (!req.session || !req.session.user) return res.status(401).json({ message: 'Token requis.' });

  const token = req.session.user.jwt.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalide.' });

    next();
  });
};

export const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: "Non authentifié" });
}