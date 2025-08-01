import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const JWT_SECRET = process.env.JWT_SECRET || 'YOWASSUP';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id; // ✅ this must be the user ID (ObjectId string)
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
 export default auth;