class ReporteController {
  constructor({
    crearReporte,
    listarReportes,
    obtenerReportePorId,
    actualizarReporte,
    eliminarReporte,
    confirmarReporte,
    agregarEvidenciaReporte,
    generarOficioReporte,
    cambiarEstadoReporte,
    listarConfirmacionesPorReporte,
    listarEvidenciasPorReporte,
    listarHistorialPorReporte,
    listarOficiosPorReporte
  }) {
    this.crearReporte = crearReporte;
    this.listarReportes = listarReportes;
    this.obtenerReportePorId = obtenerReportePorId;
    this.actualizarReporte = actualizarReporte;
    this.eliminarReporte = eliminarReporte;
    this.confirmarReporte = confirmarReporte;
    this.agregarEvidenciaReporte = agregarEvidenciaReporte;
    this.generarOficioReporte = generarOficioReporte;
    this.cambiarEstadoReporte = cambiarEstadoReporte;
    this.listarConfirmacionesPorReporte = listarConfirmacionesPorReporte;
    this.listarEvidenciasPorReporte = listarEvidenciasPorReporte;
    this.listarHistorialPorReporte = listarHistorialPorReporte;
    this.listarOficiosPorReporte = listarOficiosPorReporte;
  }

  crear = async (req, res) => {
    try {
      const data = await this.crearReporte.ejecutar(req.body);
      return res.status(201).json({ status: "success", message: "Reporte creado correctamente", data });
    } catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };

  listar = async (req, res) => {
    try {
      const data = await this.listarReportes.ejecutar(req.query);
      return res.status(200).json({ status: "success", total: data.length, data });
    } catch (error) { return res.status(500).json({ status: "error", message: "Error al listar reportes", error: error.message }); }
  };

  obtenerPorId = async (req, res) => {
    try {
      const data = await this.obtenerReportePorId.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "Reporte no encontrado" });
      return res.status(200).json({ status: "success", data });
    } catch (error) { return res.status(400).json({ status: "error", message: "Error al obtener reporte", error: error.message }); }
  };

  actualizar = async (req, res) => {
    try {
      const data = await this.actualizarReporte.ejecutar(req.params.id, req.body);
      if (!data) return res.status(404).json({ status: "error", message: "Reporte no encontrado para actualizar" });
      return res.status(200).json({ status: "success", message: "Reporte actualizado correctamente", data });
    } catch (error) { return res.status(400).json({ status: "error", message: "Error al actualizar reporte", error: error.message }); }
  };

  eliminar = async (req, res) => {
    try {
      const data = await this.eliminarReporte.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "Reporte no encontrado para eliminar" });
      return res.status(200).json({ status: "success", message: "Reporte eliminado correctamente", data });
    } catch (error) { return res.status(400).json({ status: "error", message: "Error al eliminar reporte", error: error.message }); }
  };

  confirmar = async (req, res) => {
    try {
      const data = await this.confirmarReporte.ejecutar(req.params.id, req.body);
      return res.status(201).json({ status: "success", message: "Reporte confirmado correctamente", data });
    } catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };

  agregarEvidencia = async (req, res) => {
    try {
      const data = await this.agregarEvidenciaReporte.ejecutar(req.params.id, req.body);
      return res.status(201).json({ status: "success", message: "Evidencia agregada correctamente", data });
    } catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };

  generarOficio = async (req, res) => {
    try {
      const data = await this.generarOficioReporte.ejecutar(req.params.id);
      return res.status(201).json({ status: "success", message: "Oficio generado correctamente", data });
    } catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };

  cambiarEstado = async (req, res) => {
    try {
      const data = await this.cambiarEstadoReporte.ejecutar(req.params.id, req.body);
      return res.status(200).json({ status: "success", message: "Estado cambiado correctamente", data });
    } catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };

  confirmaciones = async (req, res) => {
    try { const data = await this.listarConfirmacionesPorReporte.ejecutar(req.params.id); return res.status(200).json({ status: "success", total: data.length, data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };

  evidencias = async (req, res) => {
    try { const data = await this.listarEvidenciasPorReporte.ejecutar(req.params.id); return res.status(200).json({ status: "success", total: data.length, data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };

  historial = async (req, res) => {
    try { const data = await this.listarHistorialPorReporte.ejecutar(req.params.id); return res.status(200).json({ status: "success", total: data.length, data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };

  oficios = async (req, res) => {
    try { const data = await this.listarOficiosPorReporte.ejecutar(req.params.id); return res.status(200).json({ status: "success", total: data.length, data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };
}
module.exports = ReporteController;
