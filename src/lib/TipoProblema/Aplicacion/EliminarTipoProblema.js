class EliminarTipoProblema {
  constructor(tipoProblemaRepository) { this.tipoProblemaRepository = tipoProblemaRepository; }
  async ejecutar(id) { return await this.tipoProblemaRepository.delete(id); }
}

module.exports = EliminarTipoProblema;
