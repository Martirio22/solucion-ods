const { Schema, model, Types } = require("mongoose");

const OficioSchema = new Schema(
  {
    reporteId: { type: Types.ObjectId, ref: "Reporte", required: true },
    municipioId: { type: Types.ObjectId, ref: "Municipio", required: true },
    numeroOficio: { type: String, trim: true },
    asunto: { type: String, required: true, trim: true },
    contenido: { type: String, required: true },
    archivoUrl: { type: String, trim: true },
    estado: { type: String, enum: ["generado", "descargado", "enviado", "fallido"], default: "generado" },
    fechaEnvio: { type: Date, default: null }
  },
  { timestamps: true }
);

OficioSchema.index({ reporteId: 1 });

module.exports = model("Oficio", OficioSchema, "oficios");
