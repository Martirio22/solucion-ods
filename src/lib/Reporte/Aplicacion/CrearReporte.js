const Reporte = require("../Dominio/Entidades/Reporte");

class CrearReporte {
  constructor(reporteRepository, historialRepository) {
    this.reporteRepository = reporteRepository;
    this.historialRepository = historialRepository;
  }

  async ejecutar(data) {
    const reporte = new Reporte(data);
    const creado = await this.reporteRepository.save(reporte);

    await this.historialRepository.save({
      reporteId: creado.id,
      estadoAnterior: null,
      estadoNuevo: "pendiente",
      comentario: "Reporte creado por ciudadano"
    });

    return creado;
  }
}

module.exports = CrearReporte;
