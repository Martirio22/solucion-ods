const ConfirmacionModel = require("./ConfirmacionModel");
const { cleanDoc } = require("../../shared/toPlain");

class ConfirmacionRepositoryMongoose {
  toResponse(doc) { return cleanDoc(doc); }

  async save(data) {
    const doc = await ConfirmacionModel.create({
      reporteId: data.reporteId,
      usuarioId: data.usuarioId || null,
      ipHash: data.ipHash || null,
      dispositivoHash: data.dispositivoHash || null
    });
    return this.toResponse(doc);
  }

  async findAll() {
    const docs = await ConfirmacionModel.find()
      .populate("reporteId")
      .populate("usuarioId")
      .sort({ createdAt: -1 });
    return docs.map((doc) => this.toResponse(doc));
  }

  async findById(id) {
    const doc = await ConfirmacionModel.findById(id).populate("reporteId").populate("usuarioId");
    return this.toResponse(doc);
  }

  async findByReporte(reporteId) {
    const docs = await ConfirmacionModel.find({ reporteId }).populate("usuarioId").sort({ createdAt: -1 });
    return docs.map((doc) => this.toResponse(doc));
  }

  async delete(id) {
    const doc = await ConfirmacionModel.findByIdAndDelete(id);
    return this.toResponse(doc);
  }
}
module.exports = ConfirmacionRepositoryMongoose;
