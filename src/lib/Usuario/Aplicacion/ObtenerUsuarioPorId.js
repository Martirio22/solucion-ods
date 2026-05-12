class ObtenerUsuarioPorId {
  constructor(usuarioRepository) { this.usuarioRepository = usuarioRepository; }
  async ejecutar(id) { return await this.usuarioRepository.findById(id); }
}

module.exports = ObtenerUsuarioPorId;
