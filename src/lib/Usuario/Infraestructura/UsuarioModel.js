const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema(
  {
    nombre: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true, sparse: true, unique: true },
    telefono: { type: String, trim: true },
    esAnonimo: { type: Boolean, default: false },
    activo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = model("Usuario", UsuarioSchema, "usuarios");
