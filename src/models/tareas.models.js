import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
});

const TaskModel = mongoose.model("Tareas", taskSchema);

export default TaskModel;
