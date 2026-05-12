const HistorialEstadoReporteModel = require("./HistorialEstadoReporteModel");
const { cleanDoc } = require("../../shared/toPlain");

class HistorialEstadoReporteRepositoryMongoose {
  toResponse(doc) { return cleanDoc(doc); }

  async save(data) {
    const doc = await HistorialEstadoReporteModel.create({
      reporteId: data.reporteId,
      estadoAnterior: data.estadoAnterior || null,
      estadoNuevo: data.estadoNuevo,
      comentario: data.comentario || ""
    });
    return this.toResponse(doc);
  }

  async findAll() {
    const docs = await HistorialEstadoReporteModel.find().populate("reporteId").sort({ createdAt: -1 });
    return docs.map((doc) => this.toResponse(doc));
  }

  async findById(id) {
    const doc = await HistorialEstadoReporteModel.findById(id).populate("reporteId");
    return this.toResponse(doc);
  }

  async findByReporte(reporteId) {
    const docs = await HistorialEstadoReporteModel.find({ reporteId }).sort({ createdAt: -1 });
    return docs.map((doc) => this.toResponse(doc));
  }

  async delete(id) {
    const doc = await HistorialEstadoReporteModel.findByIdAndDelete(id);
    return this.toResponse(doc);
  }
}
module.exports = HistorialEstadoReporteRepositoryMongoose;
