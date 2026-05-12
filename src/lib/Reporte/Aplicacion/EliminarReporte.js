class EliminarReporte {
  constructor(reporteRepository) { this.reporteRepository = reporteRepository; }
  async ejecutar(id) { return await this.reporteRepository.delete(id); }
}
module.exports = EliminarReporte;
