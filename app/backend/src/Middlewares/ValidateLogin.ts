import { NextFunction, Request, Response } from 'express';

export default class ValidateLogin {
  static ValidateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static ValidatePassword(password: string): boolean {
    return password.length > 5;
  }

  static Login(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    const validEmail = ValidateLogin.ValidateEmail(email);
    const validPasswor = ValidateLogin.ValidatePassword(password);
    if (!validEmail || !validPasswor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
