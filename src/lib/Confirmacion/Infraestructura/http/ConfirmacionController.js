class ConfirmacionController {
  constructor({ listarConfirmacions, obtenerConfirmacionPorId, eliminarConfirmacion }) {
    this.listarConfirmacions = listarConfirmacions;
    this.obtenerConfirmacionPorId = obtenerConfirmacionPorId;
    this.eliminarConfirmacion = eliminarConfirmacion;
  }

  listar = async (req, res) => {
    try {
      const data = await this.listarConfirmacions.ejecutar();
      return res.status(200).json({ status: "success", total: data.length, data });
    } catch (error) { return res.status(500).json({ status: "error", message: error.message }); }
  };

  obtenerPorId = async (req, res) => {
    try {
      const data = await this.obtenerConfirmacionPorId.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "Confirmación no encontrada" });
      return res.status(200).json({ status: "success", data });
    } catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };

  eliminar = async (req, res) => {
    try {
      const data = await this.eliminarConfirmacion.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "Confirmación no encontrada" });
      return res.status(200).json({ status: "success", message: "Confirmación eliminada correctamente", data });
    } catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };
}
module.exports = ConfirmacionController;
