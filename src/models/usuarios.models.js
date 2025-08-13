import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    usuario: { type: String, required: true, trim: true },
    contraseña: { type: String, required: true, trim: true, unique: true },
    correo: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("usuarios", UserSchema);

export default userModel;
