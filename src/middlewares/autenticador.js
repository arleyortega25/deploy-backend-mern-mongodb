import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from '../config.js'
export const autenticar = (req, res, next) => {
  const cookie = req.cookies.token;
  if (!cookie) return res.status(401).json({ message: "no autorizado" });
  jwt.verify(cookie, SECRET_TOKEN, (error, user) => {
    if (error)
      return res.status(401).json({ message: "usuario no encontrado" });
    req.user = user;
    next();
  });
  
};
