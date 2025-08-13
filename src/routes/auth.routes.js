import express from "express";
import {
  registro,
  login,
  logout,
  profile,
  VerificacionToken,
} from "../controllers/auth.controllers.js";
import { autenticar } from "../middlewares/autenticador.js";
import { ValidarDatos } from "../middlewares/validar.middleware.js";
import {
  loginSchema,
  registroSchema,
} from "../schemas/autenticacion.schemas.js";
const router = express.Router();

router.post("/login", ValidarDatos(loginSchema), login);

router.post("/register", ValidarDatos(registroSchema), registro);
router.post("/logout", logout);
router.get("/profile", autenticar, profile);
router.get("/verify", VerificacionToken);

export default router;
