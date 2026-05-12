class ListarConfirmacionesPorReporte {
  constructor(confirmacionRepository) { this.confirmacionRepository = confirmacionRepository; }
  async ejecutar(reporteId) { return await this.confirmacionRepository.findByReporte(reporteId); }
}
module.exports = ListarConfirmacionesPorReporte;
