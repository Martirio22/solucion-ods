class HistorialEstadoReporteController {
  constructor({ listarHistorialEstadoReportes, obtenerHistorialEstadoReportePorId, eliminarHistorialEstadoReporte }) {
    this.listarHistorialEstadoReportes = listarHistorialEstadoReportes;
    this.obtenerHistorialEstadoReportePorId = obtenerHistorialEstadoReportePorId;
    this.eliminarHistorialEstadoReporte = eliminarHistorialEstadoReporte;
  }
  listar = async (req, res) => {
    try { const data = await this.listarHistorialEstadoReportes.ejecutar(); return res.status(200).json({ status: "success", total: data.length, data }); }
    catch (error) { return res.status(500).json({ status: "error", message: error.message }); }
  };
  obtenerPorId = async (req, res) => {
    try { const data = await this.obtenerHistorialEstadoReportePorId.ejecutar(req.params.id); if (!data) return res.status(404).json({ status: "error", message: "Historial no encontrado" }); return res.status(200).json({ status: "success", data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };
  eliminar = async (req, res) => {
    try { const data = await this.eliminarHistorialEstadoReporte.ejecutar(req.params.id); if (!data) return res.status(404).json({ status: "error", message: "Historial no encontrado" }); return res.status(200).json({ status: "success", message: "Historial eliminado correctamente", data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };
}
module.exports = HistorialEstadoReporteController;
