const { Schema, model, Types } = require("mongoose");

const ConfirmacionSchema = new Schema(
  {
    reporteId: { type: Types.ObjectId, ref: "Reporte", required: true },
    usuarioId: { type: Types.ObjectId, ref: "Usuario", default: null },
    ipHash: { type: String, trim: true },
    dispositivoHash: { type: String, trim: true }
  },
  { timestamps: true }
);

ConfirmacionSchema.index(
  { reporteId: 1, usuarioId: 1 },
  { unique: true, partialFilterExpression: { usuarioId: { $exists: true, $ne: null } } }
);

ConfirmacionSchema.index(
  { reporteId: 1, dispositivoHash: 1 },
  { unique: true, partialFilterExpression: { dispositivoHash: { $exists: true, $ne: null } } }
);

module.exports = model("Confirmacion", ConfirmacionSchema, "confirmaciones");
