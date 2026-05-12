const TipoProblema = require("../Dominio/Entidades/TipoProblema");
const TipoProblemaModel = require("./TipoProblemaModel");

class TipoProblemaRepositoryMongoose {
  toDomain(doc) {
    if (!doc) return null;
    return new TipoProblema({
      id: doc._id.toString(),
      nombre: doc.nombre,
      icono: doc.icono,
      umbralAlerta: doc.umbralAlerta
    });
  }

  async save(tipoProblema) {
    const doc = await TipoProblemaModel.create({
      nombre: tipoProblema.nombre,
      icono: tipoProblema.icono,
      umbralAlerta: tipoProblema.umbralAlerta
    });
    return this.toDomain(doc);
  }

  async findAll() {
    const docs = await TipoProblemaModel.find({ activo: true }).sort({ nombre: 1 });
    return docs.map((doc) => this.toDomain(doc));
  }

  async findById(id) {
    const doc = await TipoProblemaModel.findOne({ _id: id, activo: true });
    return this.toDomain(doc);
  }

  async update(id, tipoProblema) {
    const doc = await TipoProblemaModel.findOneAndUpdate(
      { _id: id, activo: true },
      {
        nombre: tipoProblema.nombre,
        icono: tipoProblema.icono,
        umbralAlerta: tipoProblema.umbralAlerta
      },
      { new: true, runValidators: true }
    );
    return this.toDomain(doc);
  }

  async delete(id) {
    const doc = await TipoProblemaModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true }
    );
    return this.toDomain(doc);
  }
}

module.exports = TipoProblemaRepositoryMongoose;
