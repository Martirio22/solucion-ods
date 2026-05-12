class TipoProblemaController {
  constructor({
    crearTipoProblema, listarTiposProblema, obtenerTipoProblemaPorId, actualizarTipoProblema, eliminarTipoProblema
  }) {
    this.crearTipoProblema = crearTipoProblema;
    this.listarTiposProblema = listarTiposProblema;
    this.obtenerTipoProblemaPorId = obtenerTipoProblemaPorId;
    this.actualizarTipoProblema = actualizarTipoProblema;
    this.eliminarTipoProblema = eliminarTipoProblema;
  }

  crear = async (req, res) => {
    try {
      const data = await this.crearTipoProblema.ejecutar(req.body);
      return res.status(201).json({ status: "success", message: "TipoProblema creado correctamente", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const data = await this.listarTiposProblema.ejecutar();
      return res.status(200).json({ status: "success", total: data.length, data });
    } catch (error) {
      return res.status(500).json({ status: "error", message: "Error al listar", error: error.message });
    }
  };

  obtenerPorId = async (req, res) => {
    try {
      const data = await this.obtenerTipoProblemaPorId.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "TipoProblema no encontrado" });
      return res.status(200).json({ status: "success", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Error al obtener", error: error.message });
    }
  };

  actualizar = async (req, res) => {
    try {
      const data = await this.actualizarTipoProblema.ejecutar(req.params.id, req.body);
      if (!data) return res.status(404).json({ status: "error", message: "TipoProblema no encontrado para actualizar" });
      return res.status(200).json({ status: "success", message: "TipoProblema actualizado correctamente", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Error al actualizar", error: error.message });
    }
  };

  eliminar = async (req, res) => {
    try {
      const data = await this.eliminarTipoProblema.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "TipoProblema no encontrado para eliminar" });
      return res.status(200).json({ status: "success", message: "TipoProblema eliminado correctamente", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Error al eliminar", error: error.message });
    }
  };
}

module.exports = TipoProblemaController;
