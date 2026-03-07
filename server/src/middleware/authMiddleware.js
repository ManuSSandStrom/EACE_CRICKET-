import jwt from 'jsonwebtoken';

export const authGuard = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'eace-dev-secret');
    req.user = decoded;
    return next();
  } catch (_error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
