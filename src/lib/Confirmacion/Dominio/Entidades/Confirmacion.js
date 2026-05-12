class Confirmacion {
  constructor({ id, reporteId, usuarioId, ipHash, dispositivoHash }) {
    if (!reporteId) throw new Error("El reporte es requerido");
    this.id = id;
    this.reporteId = reporteId;
    this.usuarioId = usuarioId || null;
    this.ipHash = ipHash || null;
    this.dispositivoHash = dispositivoHash || null;
  }
}
module.exports = Confirmacion;
