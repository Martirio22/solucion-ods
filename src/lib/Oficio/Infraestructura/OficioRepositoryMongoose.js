const OficioModel = require("./OficioModel");
const { cleanDoc } = require("../../shared/toPlain");

class OficioRepositoryMongoose {
  toResponse(doc) { return cleanDoc(doc); }

  async save(data) {
    const doc = await OficioModel.create({
      reporteId: data.reporteId,
      municipioId: data.municipioId,
      numeroOficio: data.numeroOficio,
      asunto: data.asunto,
      contenido: data.contenido,
      archivoUrl: data.archivoUrl || null,
      estado: data.estado || "generado"
    });
    return this.toResponse(doc);
  }

  async findAll() {
    const docs = await OficioModel.find().populate("reporteId").populate("municipioId").sort({ createdAt: -1 });
    return docs.map((doc) => this.toResponse(doc));
  }

  async findById(id) {
    const doc = await OficioModel.findById(id).populate("reporteId").populate("municipioId");
    return this.toResponse(doc);
  }

  async findByReporte(reporteId) {
    const docs = await OficioModel.find({ reporteId }).populate("municipioId").sort({ createdAt: -1 });
    return docs.map((doc) => this.toResponse(doc));
  }

  async existsByReporte(reporteId) {
    const count = await OficioModel.countDocuments({ reporteId });
    return count > 0;
  }

  async marcarEnviado(id) {
    const doc = await OficioModel.findByIdAndUpdate(
      id,
      { estado: "enviado", fechaEnvio: new Date() },
      { new: true }
    );
    return this.toResponse(doc);
  }

  async marcarDescargado(id) {
    const doc = await OficioModel.findByIdAndUpdate(id, { estado: "descargado" }, { new: true });
    return this.toResponse(doc);
  }

  async delete(id) {
    const doc = await OficioModel.findByIdAndDelete(id);
    return this.toResponse(doc);
  }
}
module.exports = OficioRepositoryMongoose;
