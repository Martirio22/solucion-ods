class HistorialEstadoReporte {
  constructor({ id, reporteId, estadoAnterior, estadoNuevo, comentario }) {
    if (!reporteId) throw new Error("El reporte es requerido");
    if (!estadoNuevo) throw new Error("El estado nuevo es requerido");
    this.id = id;
    this.reporteId = reporteId;
    this.estadoAnterior = estadoAnterior || null;
    this.estadoNuevo = estadoNuevo;
    this.comentario = comentario || "";
  }
}
module.exports = HistorialEstadoReporte;
