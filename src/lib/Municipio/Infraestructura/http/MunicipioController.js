class MunicipioController {
  constructor({
    crearMunicipio, listarMunicipios, obtenerMunicipioPorId, actualizarMunicipio, eliminarMunicipio
  }) {
    this.crearMunicipio = crearMunicipio;
    this.listarMunicipios = listarMunicipios;
    this.obtenerMunicipioPorId = obtenerMunicipioPorId;
    this.actualizarMunicipio = actualizarMunicipio;
    this.eliminarMunicipio = eliminarMunicipio;
  }

  crear = async (req, res) => {
    try {
      const data = await this.crearMunicipio.ejecutar(req.body);
      return res.status(201).json({ status: "success", message: "Municipio creado correctamente", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const data = await this.listarMunicipios.ejecutar();
      return res.status(200).json({ status: "success", total: data.length, data });
    } catch (error) {
      return res.status(500).json({ status: "error", message: "Error al listar", error: error.message });
    }
  };

  obtenerPorId = async (req, res) => {
    try {
      const data = await this.obtenerMunicipioPorId.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "Municipio no encontrado" });
      return res.status(200).json({ status: "success", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Error al obtener", error: error.message });
    }
  };

  actualizar = async (req, res) => {
    try {
      const data = await this.actualizarMunicipio.ejecutar(req.params.id, req.body);
      if (!data) return res.status(404).json({ status: "error", message: "Municipio no encontrado para actualizar" });
      return res.status(200).json({ status: "success", message: "Municipio actualizado correctamente", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Error al actualizar", error: error.message });
    }
  };

  eliminar = async (req, res) => {
    try {
      const data = await this.eliminarMunicipio.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "Municipio no encontrado para eliminar" });
      return res.status(200).json({ status: "success", message: "Municipio eliminado correctamente", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Error al eliminar", error: error.message });
    }
  };
}

module.exports = MunicipioController;
