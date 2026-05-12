class ListarHistorialPorReporte {
  constructor(historialEstadoReporteRepository) { this.historialEstadoReporteRepository = historialEstadoReporteRepository; }
  async ejecutar(reporteId) { return await this.historialEstadoReporteRepository.findByReporte(reporteId); }
}
module.exports = ListarHistorialPorReporte;
