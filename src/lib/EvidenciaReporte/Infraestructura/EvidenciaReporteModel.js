const { Schema, model, Types } = require("mongoose");

const EvidenciaReporteSchema = new Schema(
  {
    reporteId: { type: Types.ObjectId, ref: "Reporte", required: true },
    usuarioId: { type: Types.ObjectId, ref: "Usuario", default: null },
    urlArchivo: { type: String, required: true, trim: true },
    tipoArchivo: { type: String, enum: ["imagen", "video", "documento"], default: "imagen" },
    descripcion: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = model("EvidenciaReporte", EvidenciaReporteSchema, "evidencias_reporte");
