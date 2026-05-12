const express = require("express");
const router = express.Router();

module.exports = (controller) => {
  router.post("/", controller.crear);
  router.get("/", controller.listar);
  router.get("/:id", controller.obtenerPorId);
  router.put("/:id", controller.actualizar);
  router.delete("/:id", controller.eliminar);

  router.post("/:id/confirmar", controller.confirmar);
  router.post("/:id/evidencias", controller.agregarEvidencia);
  router.post("/:id/generar-oficio", controller.generarOficio);
  router.put("/:id/cambiar-estado", controller.cambiarEstado);

  router.get("/:id/confirmaciones", controller.confirmaciones);
  router.get("/:id/evidencias", controller.evidencias);
  router.get("/:id/historial", controller.historial);
  router.get("/:id/oficios", controller.oficios);

  return router;
};
