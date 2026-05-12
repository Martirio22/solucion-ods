class ObtenerEvidenciaReportePorId {
  constructor(evidenciaReporteRepository) { this.evidenciaReporteRepository = evidenciaReporteRepository; }
  async ejecutar(id) { return await this.evidenciaReporteRepository.findById(id); }
}
module.exports = ObtenerEvidenciaReportePorId;
