class ListarOficiosPorReporte {
  constructor(oficioRepository) { this.oficioRepository = oficioRepository; }
  async ejecutar(reporteId) { return await this.oficioRepository.findByReporte(reporteId); }
}
module.exports = ListarOficiosPorReporte;
