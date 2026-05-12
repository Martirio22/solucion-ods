class Oficio {
  constructor({ id, reporteId, municipioId, numeroOficio, asunto, contenido, archivoUrl, estado, fechaEnvio }) {
    if (!reporteId) throw new Error("El reporte es requerido");
    if (!municipioId) throw new Error("El municipio es requerido");
    if (!asunto) throw new Error("El asunto es requerido");
    if (!contenido) throw new Error("El contenido es requerido");

    this.id = id;
    this.reporteId = reporteId;
    this.municipioId = municipioId;
    this.numeroOficio = numeroOficio || null;
    this.asunto = asunto;
    this.contenido = contenido;
    this.archivoUrl = archivoUrl || null;
    this.estado = estado || "generado";
    this.fechaEnvio = fechaEnvio || null;
  }
}
module.exports = Oficio;
