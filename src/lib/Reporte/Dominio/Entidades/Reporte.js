class Reporte {
  constructor({
    id,
    usuarioId,
    tipoProblemaId,
    municipioId,
    descripcion,
    latitud,
    longitud,
    direccionReferencia,
    estado,
    nivelUrgencia,
    confirmaciones
  }) {
    if (!tipoProblemaId) throw new Error("El tipo de problema es requerido");
    if (!municipioId) throw new Error("El municipio es requerido");

    const lat = Number(latitud);
    const lng = Number(longitud);

    if (Number.isNaN(lat)) throw new Error("La latitud es inválida");
    if (Number.isNaN(lng)) throw new Error("La longitud es inválida");

    this.id = id;
    this.usuarioId = usuarioId || null;
    this.tipoProblemaId = tipoProblemaId;
    this.municipioId = municipioId;
    this.descripcion = descripcion || "";
    this.latitud = lat;
    this.longitud = lng;
    this.direccionReferencia = direccionReferencia || "";
    this.estado = estado || "pendiente";
    this.nivelUrgencia = nivelUrgencia || "baja";
    this.confirmaciones = Number(confirmaciones || 0);
  }
}

module.exports = Reporte;
