const { Schema, model } = require("mongoose");

const MunicipioSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true, unique: true },
    emailContacto: { type: String, trim: true },
    telefono: { type: String, trim: true },
    reportesActivos: { type: Number, default: 0 },
    activo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = model("Municipio", MunicipioSchema, "municipios");
