import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from '../config.js'

export const CrearToken =  (payload) => {
  return new Promise((resolve,reject) => {
    jwt.sign(
    {
      id: payload,
    },
    SECRET_TOKEN,
    {
      expiresIn: "1d",
    },
    (err, token) => {
      if (err) reject(err);
      resolve(token);
    }
  );
  }
  ) 
};

