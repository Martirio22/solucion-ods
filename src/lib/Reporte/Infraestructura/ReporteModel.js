const { Schema, model, Types } = require("mongoose");

const ReporteSchema = new Schema(
  {
    usuarioId: { type: Types.ObjectId, ref: "Usuario", default: null },
    tipoProblemaId: { type: Types.ObjectId, ref: "TipoProblema", required: true },
    municipioId: { type: Types.ObjectId, ref: "Municipio", required: true },
    descripcion: { type: String, trim: true },
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true },
    direccionReferencia: { type: String, trim: true },
    estado: {
      type: String,
      enum: ["pendiente", "en_revision", "escalado", "resuelto", "rechazado"],
      default: "pendiente"
    },
    nivelUrgencia: {
      type: String,
      enum: ["baja", "media", "alta", "critica"],
      default: "baja"
    },
    confirmaciones: { type: Number, default: 0 },
    activo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

ReporteSchema.index({ latitud: 1, longitud: 1 });
ReporteSchema.index({ estado: 1 });
ReporteSchema.index({ municipioId: 1 });
ReporteSchema.index({ tipoProblemaId: 1 });

module.exports = model("Reporte", ReporteSchema, "reportes");
