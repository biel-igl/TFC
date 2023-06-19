import { NextFunction, Request, Response } from 'express';
import TokenJwtService from '../services/TokenJwtService';

export default class ValidateToken {
  static Token(req:Request, res: Response, next: NextFunction): Response | void {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const jwt = new TokenJwtService();
    try {
      jwt.verify(token, 'SECRET');
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
