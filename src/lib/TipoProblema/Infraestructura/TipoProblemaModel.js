const { Schema, model } = require("mongoose");

const TipoProblemaSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true, unique: true },
    icono: { type: String, trim: true },
    umbralAlerta: { type: Number, required: true, default: 5, min: 1 },
    activo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = model("TipoProblema", TipoProblemaSchema, "tipos_problema");
