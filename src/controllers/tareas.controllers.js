import TaskModel from "../models/tareas.models.js";

export const EncontrarTarea = async (req, res) => {
  try {
    console.log(req.user.id);
    const tarea = await TaskModel.find({ usuario: req.user.id }).populate(
      "usuario"
    );
    res.json(tarea);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error al encontrar tareas" });
  }
};

export const PublicarTarea = async (req, res) => {
  try {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const usuario = req.user.id;
    const registroTarea = new TaskModel({
      titulo,
      descripcion,
      usuario,
    });
    await registroTarea.save();
    res.status(201).json({ message: "tarea creada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error al crear tarea" });
  }
};

export const BuscarIDTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const tarea = await TaskModel.findById(id);
    if (!tarea) res.status(404).json({ message: "tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "error al buscar tarea" });
  }
};

export const EliminarTarea = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.status(204).json({ message: "tarea eliminada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error al eliminar tarea" });
  }
};

export const EditarTarea = async (req, res) => {
  try {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const id = req.params.id;
    await TaskModel.findByIdAndUpdate(
      id,
      { titulo, descripcion },
      { new: true }
    );
    res.status(200).json({ message: "tarea editada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error al editar tarea" });
  }
};
