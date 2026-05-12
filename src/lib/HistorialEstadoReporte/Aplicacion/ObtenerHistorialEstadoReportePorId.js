class ObtenerHistorialEstadoReportePorId {
  constructor(historialEstadoReporteRepository) { this.historialEstadoReporteRepository = historialEstadoReporteRepository; }
  async ejecutar(id) { return await this.historialEstadoReporteRepository.findById(id); }
}
module.exports = ObtenerHistorialEstadoReportePorId;
