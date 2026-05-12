const ReporteRoutes = require("./ReporteRoutes");
const ReporteController = require("./ReporteController");

const ReporteRepositoryMongoose = require("../ReporteRepositoryMongoose");
const ConfirmacionRepositoryMongoose = require("../../../Confirmacion/Infraestructura/ConfirmacionRepositoryMongoose");
const EvidenciaReporteRepositoryMongoose = require("../../../EvidenciaReporte/Infraestructura/EvidenciaReporteRepositoryMongoose");
const OficioRepositoryMongoose = require("../../../Oficio/Infraestructura/OficioRepositoryMongoose");
const HistorialEstadoReporteRepositoryMongoose = require("../../../HistorialEstadoReporte/Infraestructura/HistorialEstadoReporteRepositoryMongoose");

const CrearReporte = require("../../Aplicacion/CrearReporte");
const ListarReportes = require("../../Aplicacion/ListarReportes");
const ObtenerReportePorId = require("../../Aplicacion/ObtenerReportePorId");
const ActualizarReporte = require("../../Aplicacion/ActualizarReporte");
const EliminarReporte = require("../../Aplicacion/EliminarReporte");
const CambiarEstadoReporte = require("../../Aplicacion/CambiarEstadoReporte");

const ConfirmarReporte = require("../../../Confirmacion/Aplicacion/ConfirmarReporte");
const ListarConfirmacionesPorReporte = require("../../../Confirmacion/Aplicacion/ListarConfirmacionesPorReporte");
const AgregarEvidenciaReporte = require("../../../EvidenciaReporte/Aplicacion/AgregarEvidenciaReporte");
const ListarEvidenciasPorReporte = require("../../../EvidenciaReporte/Aplicacion/ListarEvidenciasPorReporte");
const GenerarOficioReporte = require("../../../Oficio/Aplicacion/GenerarOficioReporte");
const ListarOficiosPorReporte = require("../../../Oficio/Aplicacion/ListarOficiosPorReporte");
const ListarHistorialPorReporte = require("../../../HistorialEstadoReporte/Aplicacion/ListarHistorialPorReporte");

module.exports = function registerReporteModule(app) {
  const reporteRepo = new ReporteRepositoryMongoose();
  const confirmacionRepo = new ConfirmacionRepositoryMongoose();
  const evidenciaRepo = new EvidenciaReporteRepositoryMongoose();
  const oficioRepo = new OficioRepositoryMongoose();
  const historialRepo = new HistorialEstadoReporteRepositoryMongoose();

  const controller = new ReporteController({
    crearReporte: new CrearReporte(reporteRepo, historialRepo),
    listarReportes: new ListarReportes(reporteRepo),
    obtenerReportePorId: new ObtenerReportePorId(reporteRepo),
    actualizarReporte: new ActualizarReporte(reporteRepo),
    eliminarReporte: new EliminarReporte(reporteRepo),
    confirmarReporte: new ConfirmarReporte(confirmacionRepo, reporteRepo, historialRepo, oficioRepo),
    agregarEvidenciaReporte: new AgregarEvidenciaReporte(evidenciaRepo, reporteRepo),
    generarOficioReporte: new GenerarOficioReporte(reporteRepo, oficioRepo, historialRepo),
    cambiarEstadoReporte: new CambiarEstadoReporte(reporteRepo, historialRepo),
    listarConfirmacionesPorReporte: new ListarConfirmacionesPorReporte(confirmacionRepo),
    listarEvidenciasPorReporte: new ListarEvidenciasPorReporte(evidenciaRepo),
    listarHistorialPorReporte: new ListarHistorialPorReporte(historialRepo),
    listarOficiosPorReporte: new ListarOficiosPorReporte(oficioRepo)
  });

  app.use("/api/reportes", ReporteRoutes(controller));
};
