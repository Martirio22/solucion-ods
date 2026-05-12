const UsuarioRoutes = require("./UsuarioRoutes");
const UsuarioController = require("./UsuarioController");
const UsuarioRepositoryMongoose = require("../UsuarioRepositoryMongoose");

const CrearUsuario = require("../../Aplicacion/CrearUsuario");
const ListarUsuarios = require("../../Aplicacion/ListarUsuarios");
const ObtenerUsuarioPorId = require("../../Aplicacion/ObtenerUsuarioPorId");
const ActualizarUsuario = require("../../Aplicacion/ActualizarUsuario");
const EliminarUsuario = require("../../Aplicacion/EliminarUsuario");

module.exports = function registerUsuarioModule(app) {
  const repo = new UsuarioRepositoryMongoose();
  const controller = new UsuarioController({
    crearUsuario: new CrearUsuario(repo),
    listarUsuarios: new ListarUsuarios(repo),
    obtenerUsuarioPorId: new ObtenerUsuarioPorId(repo),
    actualizarUsuario: new ActualizarUsuario(repo),
    eliminarUsuario: new EliminarUsuario(repo)
  });
  app.use("/api/usuarios", UsuarioRoutes(controller));
};
