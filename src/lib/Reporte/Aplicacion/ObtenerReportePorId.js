class ObtenerReportePorId {
  constructor(reporteRepository) { this.reporteRepository = reporteRepository; }
  async ejecutar(id) { return await this.reporteRepository.findById(id); }
}
module.exports = ObtenerReportePorId;
