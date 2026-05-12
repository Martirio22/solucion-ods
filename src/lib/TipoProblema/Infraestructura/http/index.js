const TipoProblemaRoutes = require("./TipoProblemaRoutes");
const TipoProblemaController = require("./TipoProblemaController");
const TipoProblemaRepositoryMongoose = require("../TipoProblemaRepositoryMongoose");

const CrearTipoProblema = require("../../Aplicacion/CrearTipoProblema");
const ListarTiposProblema = require("../../Aplicacion/ListarTiposProblema");
const ObtenerTipoProblemaPorId = require("../../Aplicacion/ObtenerTipoProblemaPorId");
const ActualizarTipoProblema = require("../../Aplicacion/ActualizarTipoProblema");
const EliminarTipoProblema = require("../../Aplicacion/EliminarTipoProblema");

module.exports = function registerTipoProblemaModule(app) {
  const repo = new TipoProblemaRepositoryMongoose();
  const controller = new TipoProblemaController({
    crearTipoProblema: new CrearTipoProblema(repo),
    listarTiposProblema: new ListarTiposProblema(repo),
    obtenerTipoProblemaPorId: new ObtenerTipoProblemaPorId(repo),
    actualizarTipoProblema: new ActualizarTipoProblema(repo),
    eliminarTipoProblema: new EliminarTipoProblema(repo)
  });
  app.use("/api/tipos-problema", TipoProblemaRoutes(controller));
};
