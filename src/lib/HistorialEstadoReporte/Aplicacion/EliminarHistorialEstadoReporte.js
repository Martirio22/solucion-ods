class EliminarHistorialEstadoReporte {
  constructor(historialEstadoReporteRepository) { this.historialEstadoReporteRepository = historialEstadoReporteRepository; }
  async ejecutar(id) { return await this.historialEstadoReporteRepository.delete(id); }
}
module.exports = EliminarHistorialEstadoReporte;
