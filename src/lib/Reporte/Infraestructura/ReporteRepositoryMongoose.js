const Reporte = require("../Dominio/Entidades/Reporte");
const ReporteModel = require("./ReporteModel");
const { cleanDoc, normalizeId } = require("../../shared/toPlain");

class ReporteRepositoryMongoose {
  toDomain(doc) {
    if (!doc) return null;
    return new Reporte({
      id: doc._id.toString(),
      usuarioId: normalizeId(doc.usuarioId),
      tipoProblemaId: normalizeId(doc.tipoProblemaId),
      municipioId: normalizeId(doc.municipioId),
      descripcion: doc.descripcion,
      latitud: doc.latitud,
      longitud: doc.longitud,
      direccionReferencia: doc.direccionReferencia,
      estado: doc.estado,
      nivelUrgencia: doc.nivelUrgencia,
      confirmaciones: doc.confirmaciones
    });
  }

  toResponse(doc) {
    const plain = cleanDoc(doc);
    if (!plain) return null;

    if (plain.usuarioId && typeof plain.usuarioId === "object") {
      plain.usuario = cleanDoc(plain.usuarioId);
      plain.usuarioId = plain.usuario.id;
    }

    if (plain.tipoProblemaId && typeof plain.tipoProblemaId === "object") {
      plain.tipoProblema = cleanDoc(plain.tipoProblemaId);
      plain.tipoProblemaId = plain.tipoProblema.id;
    }

    if (plain.municipioId && typeof plain.municipioId === "object") {
      plain.municipio = cleanDoc(plain.municipioId);
      plain.municipioId = plain.municipio.id;
    }

    return plain;
  }

  populateQuery(query) {
    return query
      .populate("municipioId")
      .populate("tipoProblemaId")
      .populate("usuarioId");
  }

  async save(reporte) {
    const doc = await ReporteModel.create({
      usuarioId: reporte.usuarioId,
      tipoProblemaId: reporte.tipoProblemaId,
      municipioId: reporte.municipioId,
      descripcion: reporte.descripcion,
      latitud: reporte.latitud,
      longitud: reporte.longitud,
      direccionReferencia: reporte.direccionReferencia,
      estado: reporte.estado,
      nivelUrgencia: reporte.nivelUrgencia,
      confirmaciones: reporte.confirmaciones
    });
    return this.toDomain(doc);
  }

  async findAll(filters = {}) {
    const query = { activo: true };

    if (filters.estado) query.estado = filters.estado;
    if (filters.municipioId) query.municipioId = filters.municipioId;
    if (filters.tipoProblemaId) query.tipoProblemaId = filters.tipoProblemaId;
    if (filters.nivelUrgencia) query.nivelUrgencia = filters.nivelUrgencia;

    const docs = await this.populateQuery(ReporteModel.find(query)).sort({ createdAt: -1 });
    return docs.map((doc) => this.toResponse(doc));
  }

  async findById(id) {
    const doc = await this.populateQuery(ReporteModel.findOne({ _id: id, activo: true }));
    return this.toResponse(doc);
  }

  async update(id, reporte) {
    const doc = await ReporteModel.findOneAndUpdate(
      { _id: id, activo: true },
      {
        usuarioId: reporte.usuarioId,
        tipoProblemaId: reporte.tipoProblemaId,
        municipioId: reporte.municipioId,
        descripcion: reporte.descripcion,
        latitud: reporte.latitud,
        longitud: reporte.longitud,
        direccionReferencia: reporte.direccionReferencia,
        estado: reporte.estado,
        nivelUrgencia: reporte.nivelUrgencia
      },
      { new: true, runValidators: true }
    );
    return this.toDomain(doc);
  }

  async delete(id) {
    const doc = await ReporteModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true }
    );
    return this.toDomain(doc);
  }

  async incrementarConfirmaciones(id) {
    const doc = await this.populateQuery(
      ReporteModel.findOneAndUpdate(
        { _id: id, activo: true },
        { $inc: { confirmaciones: 1 } },
        { new: true }
      )
    );
    return this.toResponse(doc);
  }

  async cambiarEstado(id, estado, nivelUrgencia) {
    const update = { estado };
    if (nivelUrgencia) update.nivelUrgencia = nivelUrgencia;

    const doc = await this.populateQuery(
      ReporteModel.findOneAndUpdate({ _id: id, activo: true }, update, { new: true })
    );
    return this.toResponse(doc);
  }
}

module.exports = ReporteRepositoryMongoose;
