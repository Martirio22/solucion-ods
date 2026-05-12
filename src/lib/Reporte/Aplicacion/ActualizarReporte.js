const Reporte = require("../Dominio/Entidades/Reporte");

class ActualizarReporte {
  constructor(reporteRepository) { this.reporteRepository = reporteRepository; }

  async ejecutar(id, data) {
    const actual = await this.reporteRepository.findById(id);
    if (!actual) return null;

    const reporte = new Reporte({ id, ...actual, ...data });
    return await this.reporteRepository.update(id, reporte);
  }
}
module.exports = ActualizarReporte;
