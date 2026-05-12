class OficioController {
  constructor({ listarOficios, obtenerOficioPorId, marcarOficioEnviado, eliminarOficio }) {
    this.listarOficios = listarOficios;
    this.obtenerOficioPorId = obtenerOficioPorId;
    this.marcarOficioEnviado = marcarOficioEnviado;
    this.eliminarOficio = eliminarOficio;
  }
  listar = async (req, res) => {
    try { const data = await this.listarOficios.ejecutar(); return res.status(200).json({ status: "success", total: data.length, data }); }
    catch (error) { return res.status(500).json({ status: "error", message: error.message }); }
  };
  obtenerPorId = async (req, res) => {
    try { const data = await this.obtenerOficioPorId.ejecutar(req.params.id); if (!data) return res.status(404).json({ status: "error", message: "Oficio no encontrado" }); return res.status(200).json({ status: "success", data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };
  marcarEnviado = async (req, res) => {
    try { const data = await this.marcarOficioEnviado.ejecutar(req.params.id); if (!data) return res.status(404).json({ status: "error", message: "Oficio no encontrado" }); return res.status(200).json({ status: "success", message: "Oficio marcado como enviado", data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };
  eliminar = async (req, res) => {
    try { const data = await this.eliminarOficio.ejecutar(req.params.id); if (!data) return res.status(404).json({ status: "error", message: "Oficio no encontrado" }); return res.status(200).json({ status: "success", message: "Oficio eliminado correctamente", data }); }
    catch (error) { return res.status(400).json({ status: "error", message: error.message }); }
  };
}
module.exports = OficioController;
