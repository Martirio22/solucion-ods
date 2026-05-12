class ListarReportes {
  constructor(reporteRepository) { this.reporteRepository = reporteRepository; }
  async ejecutar(filters) { return await this.reporteRepository.findAll(filters); }
}
module.exports = ListarReportes;
