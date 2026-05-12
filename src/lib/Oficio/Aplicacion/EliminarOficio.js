class EliminarOficio {
  constructor(oficioRepository) { this.oficioRepository = oficioRepository; }
  async ejecutar(id) { return await this.oficioRepository.delete(id); }
}
module.exports = EliminarOficio;
