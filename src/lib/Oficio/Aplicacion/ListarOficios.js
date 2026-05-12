class ListarOficios {
  constructor(oficioRepository) { this.oficioRepository = oficioRepository; }
  async ejecutar() { return await this.oficioRepository.findAll(); }
}
module.exports = ListarOficios;
