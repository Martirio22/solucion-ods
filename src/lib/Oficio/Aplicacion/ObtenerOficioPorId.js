class ObtenerOficioPorId {
  constructor(oficioRepository) { this.oficioRepository = oficioRepository; }
  async ejecutar(id) { return await this.oficioRepository.findById(id); }
}
module.exports = ObtenerOficioPorId;
