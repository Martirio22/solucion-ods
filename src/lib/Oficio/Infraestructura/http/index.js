const OficioRoutes = require("./OficioRoutes");
const OficioController = require("./OficioController");
const OficioRepositoryMongoose = require("../OficioRepositoryMongoose");
const ListarOficios = require("../../Aplicacion/ListarOficios");
const ObtenerOficioPorId = require("../../Aplicacion/ObtenerOficioPorId");
const MarcarOficioEnviado = require("../../Aplicacion/MarcarOficioEnviado");
const EliminarOficio = require("../../Aplicacion/EliminarOficio");

module.exports = function registerOficioModule(app) {
  const repo = new OficioRepositoryMongoose();
  const controller = new OficioController({
    listarOficios: new ListarOficios(repo),
    obtenerOficioPorId: new ObtenerOficioPorId(repo),
    marcarOficioEnviado: new MarcarOficioEnviado(repo),
    eliminarOficio: new EliminarOficio(repo)
  });
  app.use("/api/oficios", OficioRoutes(controller));
};
