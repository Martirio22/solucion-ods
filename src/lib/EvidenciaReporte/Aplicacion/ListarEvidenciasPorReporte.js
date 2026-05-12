class ListarEvidenciasPorReporte {
  constructor(evidenciaReporteRepository) { this.evidenciaReporteRepository = evidenciaReporteRepository; }
  async ejecutar(reporteId) { return await this.evidenciaReporteRepository.findByReporte(reporteId); }
}
module.exports = ListarEvidenciasPorReporte;
