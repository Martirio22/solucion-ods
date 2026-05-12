class EliminarEvidenciaReporte {
  constructor(evidenciaReporteRepository) { this.evidenciaReporteRepository = evidenciaReporteRepository; }
  async ejecutar(id) { return await this.evidenciaReporteRepository.delete(id); }
}
module.exports = EliminarEvidenciaReporte;
