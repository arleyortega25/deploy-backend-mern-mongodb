import userModel from "../models/usuarios.models.js";
import bcryptjs from "bcryptjs";
import { CrearToken } from "../libs/token.libs.js";
import jwt from "jsonwebtoken";

export const registro = async (req, res) => {
  try {
    const usuario = req.body.usuario;
    const contraseña = await bcryptjs.hash(req.body.contraseña, 10);
    const correo = req.body.correo;
    const CorreoEncontrado = await userModel.findOne({ correo });
    if (CorreoEncontrado)
      return res.status(400).json({ message: ["este correo ya esta en uso"] });
    const resgistroUsuario = new userModel({
      usuario,
      contraseña,
      correo,
    });
    await resgistroUsuario.save();
    const idToken = resgistroUsuario.id;
    const token = await CrearToken(idToken);
    res.cookie("token", token);
    res.json({ message: "usuario registrado" });
  } catch (error) {
    console.error(error);
  }
};
export const login = async (req, res) => {
  try {
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    const coincidencia = await userModel.findOne({ usuario });
    if (!coincidencia) {
      res.status(400).json({ message: "usuario no registrado" });
    }

    const match = await bcryptjs.compare(contraseña, coincidencia.contraseña);
    if (!match) {
      res.status(400).json({ message: "contraseña incorrecta" });
    }
    const idToken = coincidencia.id;
    const token = await CrearToken(idToken);
    res.cookie("token", token);
    res.json({ message: "usuario logeado" });
  } catch (error) {
    console.error(error);
  }
};
export const logout = (req, res) => {
  res.cookie("token", "", {
    expiresIn: new Date(0),
  });
  return res.status(200).json({
    message: "logout",
  });
};
export const profile = async (req, res) => {
  const id = req.usuario.id;

  const FoundUsuario = await userModel.findById(id);
  if (!FoundUsuario)
    return res.status(400).json({ message: "usuario no encontrado" });
  return res.json({
    usuario: FoundUsuario.usuario,
    correo: FoundUsuario.correo,
  });
};
export const VerificacionToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "no autorizado" });

  jwt.verify(token, "secret", async (err, user) => {
    if (err) return res.status(401).json({ message: "no autorizado" });
    const usuarioEncontrado = await userModel.findById(user.id);
    if (!usuarioEncontrado)
      return res.status(401).json({ message: "no autorizado" });
    return res.json({
      id: usuarioEncontrado.id,
      usuario: usuarioEncontrado.usuario,
      correo: usuarioEncontrado.correo,
    });
  });
};
