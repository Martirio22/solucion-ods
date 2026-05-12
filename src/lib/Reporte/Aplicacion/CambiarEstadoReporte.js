class CambiarEstadoReporte {
  constructor(reporteRepository, historialRepository) {
    this.reporteRepository = reporteRepository;
    this.historialRepository = historialRepository;
  }

  async ejecutar(id, data) {
    if (!data.estado) throw new Error("El nuevo estado es requerido");

    const estados = ["pendiente", "en_revision", "escalado", "resuelto", "rechazado"];
    if (!estados.includes(data.estado)) throw new Error("Estado no permitido");

    const actual = await this.reporteRepository.findById(id);
    if (!actual) throw new Error("Reporte no encontrado");

    const actualizado = await this.reporteRepository.cambiarEstado(id, data.estado, data.nivelUrgencia);

    await this.historialRepository.save({
      reporteId: id,
      estadoAnterior: actual.estado,
      estadoNuevo: data.estado,
      comentario: data.comentario || "Cambio de estado manual"
    });

    return actualizado;
  }
}
module.exports = CambiarEstadoReporte;
