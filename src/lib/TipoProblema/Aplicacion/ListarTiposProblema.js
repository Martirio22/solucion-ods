class ListarTiposProblema {
  constructor(tipoProblemaRepository) { this.tipoProblemaRepository = tipoProblemaRepository; }
  async ejecutar() { return await this.tipoProblemaRepository.findAll(); }
}

module.exports = ListarTiposProblema;
