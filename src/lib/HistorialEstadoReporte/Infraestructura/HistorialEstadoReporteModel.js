const { Schema, model, Types } = require("mongoose");

const HistorialEstadoReporteSchema = new Schema(
  {
    reporteId: { type: Types.ObjectId, ref: "Reporte", required: true },
    estadoAnterior: { type: String, default: null },
    estadoNuevo: {
      type: String,
      enum: ["pendiente", "en_revision", "escalado", "resuelto", "rechazado"],
      required: true
    },
    comentario: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = model("HistorialEstadoReporte", HistorialEstadoReporteSchema, "historial_estados_reporte");
