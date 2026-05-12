class ListarHistorialEstadoReportes {
  constructor(historialEstadoReporteRepository) { this.historialEstadoReporteRepository = historialEstadoReporteRepository; }
  async ejecutar() { return await this.historialEstadoReporteRepository.findAll(); }
}
module.exports = ListarHistorialEstadoReportes;
