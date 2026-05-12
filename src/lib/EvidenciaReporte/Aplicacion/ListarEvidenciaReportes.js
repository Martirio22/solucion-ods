class ListarEvidenciaReportes {
  constructor(evidenciaReporteRepository) { this.evidenciaReporteRepository = evidenciaReporteRepository; }
  async ejecutar() { return await this.evidenciaReporteRepository.findAll(); }
}
module.exports = ListarEvidenciaReportes;
