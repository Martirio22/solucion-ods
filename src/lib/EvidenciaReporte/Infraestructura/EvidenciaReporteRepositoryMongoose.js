const EvidenciaReporteModel = require("./EvidenciaReporteModel");
const { cleanDoc } = require("../../shared/toPlain");

class EvidenciaReporteRepositoryMongoose {
  toResponse(doc) { return cleanDoc(doc); }

  async save(data) {
    const doc = await EvidenciaReporteModel.create({
      reporteId: data.reporteId,
      usuarioId: data.usuarioId || null,
      urlArchivo: data.urlArchivo,
      tipoArchivo: data.tipoArchivo || "imagen",
      descripcion: data.descripcion || ""
    });
    return this.toResponse(doc);
  }

  async findAll() {
    const docs = await EvidenciaReporteModel.find().populate("reporteId").populate("usuarioId").sort({ createdAt: -1 });
    return docs.map((doc) => this.toResponse(doc));
  }

  async findById(id) {
    const doc = await EvidenciaReporteModel.findById(id).populate("reporteId").populate("usuarioId");
    return this.toResponse(doc);
  }

  async findByReporte(reporteId) {
    const docs = await EvidenciaReporteModel.find({ reporteId }).populate("usuarioId").sort({ createdAt: -1 });
    return docs.map((doc) => this.toResponse(doc));
  }

  async delete(id) {
    const doc = await EvidenciaReporteModel.findByIdAndDelete(id);
    return this.toResponse(doc);
  }
}
module.exports = EvidenciaReporteRepositoryMongoose;
