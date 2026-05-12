const Usuario = require("../Dominio/Entidades/Usuario");

class ActualizarUsuario {
  constructor(usuarioRepository) { this.usuarioRepository = usuarioRepository; }

  async ejecutar(id, data) {
    const usuario = new Usuario({
      id,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      esAnonimo: data.esAnonimo
    });
    return await this.usuarioRepository.update(id, usuario);
  }
}

module.exports = ActualizarUsuario;
