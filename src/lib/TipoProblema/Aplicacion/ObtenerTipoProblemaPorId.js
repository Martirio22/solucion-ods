class ObtenerTipoProblemaPorId {
  constructor(tipoProblemaRepository) { this.tipoProblemaRepository = tipoProblemaRepository; }
  async ejecutar(id) { return await this.tipoProblemaRepository.findById(id); }
}

module.exports = ObtenerTipoProblemaPorId;
