const Usuario = require("../Dominio/Entidades/Usuario");
const UsuarioModel = require("./UsuarioModel");

class UsuarioRepositoryMongoose {
  toDomain(doc) {
    if (!doc) return null;
    return new Usuario({
      id: doc._id.toString(),
      nombre: doc.nombre,
      email: doc.email,
      telefono: doc.telefono,
      esAnonimo: doc.esAnonimo
    });
  }

  async save(usuario) {
    const doc = await UsuarioModel.create({
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      esAnonimo: usuario.esAnonimo
    });
    return this.toDomain(doc);
  }

  async findAll() {
    const docs = await UsuarioModel.find({ activo: true }).sort({ createdAt: -1 });
    return docs.map((doc) => this.toDomain(doc));
  }

  async findById(id) {
    const doc = await UsuarioModel.findOne({ _id: id, activo: true });
    return this.toDomain(doc);
  }

  async update(id, usuario) {
    const doc = await UsuarioModel.findOneAndUpdate(
      { _id: id, activo: true },
      {
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        esAnonimo: usuario.esAnonimo
      },
      { new: true, runValidators: true }
    );
    return this.toDomain(doc);
  }

  async delete(id) {
    const doc = await UsuarioModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true }
    );
    return this.toDomain(doc);
  }
}

module.exports = UsuarioRepositoryMongoose;
