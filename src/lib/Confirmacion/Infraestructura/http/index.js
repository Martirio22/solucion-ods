const ConfirmacionRoutes = require("./ConfirmacionRoutes");
const ConfirmacionController = require("./ConfirmacionController");
const ConfirmacionRepositoryMongoose = require("../ConfirmacionRepositoryMongoose");
const ListarConfirmacions = require("../../Aplicacion/ListarConfirmacions");
const ObtenerConfirmacionPorId = require("../../Aplicacion/ObtenerConfirmacionPorId");
const EliminarConfirmacion = require("../../Aplicacion/EliminarConfirmacion");

module.exports = function registerConfirmacionModule(app) {
  const repo = new ConfirmacionRepositoryMongoose();
  const controller = new ConfirmacionController({
    listarConfirmacions: new ListarConfirmacions(repo),
    obtenerConfirmacionPorId: new ObtenerConfirmacionPorId(repo),
    eliminarConfirmacion: new EliminarConfirmacion(repo)
  });
  app.use("/api/confirmaciones", ConfirmacionRoutes(controller));
};
