class EvidenciaReporte {
  constructor({ id, reporteId, usuarioId, urlArchivo, tipoArchivo, descripcion }) {
    if (!reporteId) throw new Error("El reporte es requerido");
    if (!urlArchivo) throw new Error("La URL del archivo es requerida");
    this.id = id;
    this.reporteId = reporteId;
    this.usuarioId = usuarioId || null;
    this.urlArchivo = urlArchivo;
    this.tipoArchivo = tipoArchivo || "imagen";
    this.descripcion = descripcion || "";
  }
}
module.exports = EvidenciaReporte;
