class MarcarOficioEnviado {
  constructor(oficioRepository) { this.oficioRepository = oficioRepository; }
  async ejecutar(id) { return await this.oficioRepository.marcarEnviado(id); }
}
module.exports = MarcarOficioEnviado;
