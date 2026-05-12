const EvidenciaReporte = require("../Dominio/Entidades/EvidenciaReporte");

class AgregarEvidenciaReporte {
  constructor(evidenciaReporteRepository, reporteRepository) {
    this.evidenciaReporteRepository = evidenciaReporteRepository;
    this.reporteRepository = reporteRepository;
  }

  async ejecutar(reporteId, data) {
    const reporte = await this.reporteRepository.findById(reporteId);
    if (!reporte) throw new Error("Reporte no encontrado");

    const evidencia = new EvidenciaReporte({ reporteId, ...data });
    return await this.evidenciaReporteRepository.save(evidencia);
  }
}
module.exports = AgregarEvidenciaReporte;
