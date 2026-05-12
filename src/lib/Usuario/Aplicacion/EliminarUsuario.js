class EliminarUsuario {
  constructor(usuarioRepository) { this.usuarioRepository = usuarioRepository; }
  async ejecutar(id) { return await this.usuarioRepository.delete(id); }
}

module.exports = EliminarUsuario;
