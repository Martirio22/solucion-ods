const HistorialEstadoReporteRoutes = require("./HistorialEstadoReporteRoutes");
const HistorialEstadoReporteController = require("./HistorialEstadoReporteController");
const HistorialEstadoReporteRepositoryMongoose = require("../HistorialEstadoReporteRepositoryMongoose");
const ListarHistorialEstadoReportes = require("../../Aplicacion/ListarHistorialEstadoReportes");
const ObtenerHistorialEstadoReportePorId = require("../../Aplicacion/ObtenerHistorialEstadoReportePorId");
const EliminarHistorialEstadoReporte = require("../../Aplicacion/EliminarHistorialEstadoReporte");

module.exports = function registerHistorialEstadoReporteModule(app) {
  const repo = new HistorialEstadoReporteRepositoryMongoose();
  const controller = new HistorialEstadoReporteController({
    listarHistorialEstadoReportes: new ListarHistorialEstadoReportes(repo),
    obtenerHistorialEstadoReportePorId: new ObtenerHistorialEstadoReportePorId(repo),
    eliminarHistorialEstadoReporte: new EliminarHistorialEstadoReporte(repo)
  });
  app.use("/api/historial-estados", HistorialEstadoReporteRoutes(controller));
};
