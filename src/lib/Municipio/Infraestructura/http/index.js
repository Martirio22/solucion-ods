const MunicipioRoutes = require("./MunicipioRoutes");
const MunicipioController = require("./MunicipioController");
const MunicipioRepositoryMongoose = require("../MunicipioRepositoryMongoose");

const CrearMunicipio = require("../../Aplicacion/CrearMunicipio");
const ListarMunicipios = require("../../Aplicacion/ListarMunicipios");
const ObtenerMunicipioPorId = require("../../Aplicacion/ObtenerMunicipioPorId");
const ActualizarMunicipio = require("../../Aplicacion/ActualizarMunicipio");
const EliminarMunicipio = require("../../Aplicacion/EliminarMunicipio");

module.exports = function registerMunicipioModule(app) {
  const repo = new MunicipioRepositoryMongoose();
  const controller = new MunicipioController({
    crearMunicipio: new CrearMunicipio(repo),
    listarMunicipios: new ListarMunicipios(repo),
    obtenerMunicipioPorId: new ObtenerMunicipioPorId(repo),
    actualizarMunicipio: new ActualizarMunicipio(repo),
    eliminarMunicipio: new EliminarMunicipio(repo)
  });
  app.use("/api/municipios", MunicipioRoutes(controller));
};
