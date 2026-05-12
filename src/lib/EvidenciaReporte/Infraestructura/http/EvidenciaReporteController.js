class EvidenciaReporteController {
  constructor({ listarEvidenciaReportes, obtenerEvidenciaReportePorId, eliminarEvidenciaReporte }) {
    this.listarEvidenciaReportes = listarEvidenciaReportes;
    this.obtenerEvidenciaReportePorId = obtenerEvidenciaReportePorId;
    this.eliminarEvidenciaReporte = eliminarEvidenciaReporte;
  }
  listar = async (req, res) => {
    try { const data = await this.listarEvidenciaReportes.ejecutar(); return res.status(200).json({ status: "success", total: data.length, data }); }
    catch (error) { return res.status(500).json({ status: "error", message: error.message }); }
  };
  obtenerPorId = async (req, res) => {
    try { const data = await this.obtenerEvidenciaReportePorId.ejecutar(req.params.id); if (!data) return res.status(404).json({ status: "error", message: "Evidencia no encontrada" }); return res.status(200).json({ status: "success", data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };
  eliminar = async (req, res) => {
    try { const data = await this.eliminarEvidenciaReporte.ejecutar(req.params.id); if (!data) return res.status(404).json({ status: "error", message: "Evidencia no encontrada" }); return res.status(200).json({ status: "success", message: "Evidencia eliminada correctamente", data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };
}
module.exports = EvidenciaReporteController;
