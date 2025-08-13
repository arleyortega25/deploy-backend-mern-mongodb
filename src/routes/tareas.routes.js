import express from "express";
import {
  EncontrarTarea,
  PublicarTarea,
  BuscarIDTarea,
  EliminarTarea,
  EditarTarea,
} from "../controllers/tareas.controllers.js";
import { autenticar } from "../middlewares/autenticador.js";
import { ValidarDatos } from "../middlewares/validar.middleware.js";
import tareaSchema from "../schemas/tareas.schemas.js";
const router = express.Router();

router.get("/tareas", autenticar, EncontrarTarea);
router.get("/tareas/:id", autenticar, BuscarIDTarea);
router.post("/tareas", autenticar, ValidarDatos(tareaSchema), PublicarTarea);
router.put("/tareas/:id", autenticar, EditarTarea);
router.delete("/tareas/:id", autenticar, EliminarTarea);


export default router;
