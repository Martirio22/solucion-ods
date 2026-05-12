const EvidenciaReporteRoutes = require("./EvidenciaReporteRoutes");
const EvidenciaReporteController = require("./EvidenciaReporteController");
const EvidenciaReporteRepositoryMongoose = require("../EvidenciaReporteRepositoryMongoose");
const ListarEvidenciaReportes = require("../../Aplicacion/ListarEvidenciaReportes");
const ObtenerEvidenciaReportePorId = require("../../Aplicacion/ObtenerEvidenciaReportePorId");
const EliminarEvidenciaReporte = require("../../Aplicacion/EliminarEvidenciaReporte");

module.exports = function registerEvidenciaReporteModule(app) {
  const repo = new EvidenciaReporteRepositoryMongoose();
  const controller = new EvidenciaReporteController({
    listarEvidenciaReportes: new ListarEvidenciaReportes(repo),
    obtenerEvidenciaReportePorId: new ObtenerEvidenciaReportePorId(repo),
    eliminarEvidenciaReporte: new EliminarEvidenciaReporte(repo)
  });
  app.use("/api/evidencias", EvidenciaReporteRoutes(controller));
};
