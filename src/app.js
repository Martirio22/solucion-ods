const express = require("express");
const cors = require("cors");

const registerMunicipioModule = require("./lib/Municipio/Infraestructura/http");
const registerTipoProblemaModule = require("./lib/TipoProblema/Infraestructura/http");
const registerUsuarioModule = require("./lib/Usuario/Infraestructura/http");
const registerReporteModule = require("./lib/Reporte/Infraestructura/http");
const registerConfirmacionModule = require("./lib/Confirmacion/Infraestructura/http");
const registerEvidenciaReporteModule = require("./lib/EvidenciaReporte/Infraestructura/http");
const registerOficioModule = require("./lib/Oficio/Infraestructura/http");
const registerHistorialEstadoReporteModule = require("./lib/HistorialEstadoReporte/Infraestructura/http");

function buildApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    return res.status(200).json({
      status: "success",
      message: "API AguaAlerta funcionando correctamente"
    });
  });

  registerMunicipioModule(app);
  registerTipoProblemaModule(app);
  registerUsuarioModule(app);
  registerReporteModule(app);
  registerConfirmacionModule(app);
  registerEvidenciaReporteModule(app);
  registerOficioModule(app);
  registerHistorialEstadoReporteModule(app);

  app.use((req, res) => {
    return res.status(404).json({
      status: "error",
      message: "Ruta no encontrada"
    });
  });

  app.use((err, req, res, next) => {
    console.error(err);

    return res.status(err.statusCode || 500).json({
      status: "error",
      message: err.message || "Error interno del servidor"
    });
  });

  return app;
}

module.exports = buildApp;
