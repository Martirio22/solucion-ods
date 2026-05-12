class UsuarioController {
  constructor({
    crearUsuario, listarUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario
  }) {
    this.crearUsuario = crearUsuario;
    this.listarUsuarios = listarUsuarios;
    this.obtenerUsuarioPorId = obtenerUsuarioPorId;
    this.actualizarUsuario = actualizarUsuario;
    this.eliminarUsuario = eliminarUsuario;
  }

  crear = async (req, res) => {
    try {
      const data = await this.crearUsuario.ejecutar(req.body);
      return res.status(201).json({ status: "success", message: "Usuario creado correctamente", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }
  };

  listar = async (req, res) => {
    try {
      const data = await this.listarUsuarios.ejecutar();
      return res.status(200).json({ status: "success", total: data.length, data });
    } catch (error) {
      return res.status(500).json({ status: "error", message: "Error al listar", error: error.message });
    }
  };

  obtenerPorId = async (req, res) => {
    try {
      const data = await this.obtenerUsuarioPorId.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
      return res.status(200).json({ status: "success", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Error al obtener", error: error.message });
    }
  };

  actualizar = async (req, res) => {
    try {
      const data = await this.actualizarUsuario.ejecutar(req.params.id, req.body);
      if (!data) return res.status(404).json({ status: "error", message: "Usuario no encontrado para actualizar" });
      return res.status(200).json({ status: "success", message: "Usuario actualizado correctamente", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Error al actualizar", error: error.message });
    }
  };

  eliminar = async (req, res) => {
    try {
      const data = await this.eliminarUsuario.ejecutar(req.params.id);
      if (!data) return res.status(404).json({ status: "error", message: "Usuario no encontrado para eliminar" });
      return res.status(200).json({ status: "success", message: "Usuario eliminado correctamente", data });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Error al eliminar", error: error.message });
    }
  };
}

module.exports = UsuarioController;
