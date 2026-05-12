const Municipio = require("../Dominio/Entidades/Municipio");
const MunicipioModel = require("./MunicipioModel");

class MunicipioRepositoryMongoose {
  toDomain(doc) {
    if (!doc) return null;
    return new Municipio({
      id: doc._id.toString(),
      nombre: doc.nombre,
      emailContacto: doc.emailContacto,
      telefono: doc.telefono,
      reportesActivos: doc.reportesActivos
    });
  }

  async save(municipio) {
    const doc = await MunicipioModel.create({
      nombre: municipio.nombre,
      emailContacto: municipio.emailContacto,
      telefono: municipio.telefono,
      reportesActivos: municipio.reportesActivos
    });
    return this.toDomain(doc);
  }

  async findAll() {
    const docs = await MunicipioModel.find({ activo: true }).sort({ nombre: 1 });
    return docs.map((doc) => this.toDomain(doc));
  }

  async findById(id) {
    const doc = await MunicipioModel.findOne({ _id: id, activo: true });
    return this.toDomain(doc);
  }

  async update(id, municipio) {
    const doc = await MunicipioModel.findOneAndUpdate(
      { _id: id, activo: true },
      {
        nombre: municipio.nombre,
        emailContacto: municipio.emailContacto,
        telefono: municipio.telefono
      },
      { new: true, runValidators: true }
    );
    return this.toDomain(doc);
  }

  async delete(id) {
    const doc = await MunicipioModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true }
    );
    return this.toDomain(doc);
  }
}

module.exports = MunicipioRepositoryMongoose;
