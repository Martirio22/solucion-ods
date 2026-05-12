const express = require("express");
const router = express.Router();

module.exports = (controller) => {
  router.get("/", controller.listar);
  router.get("/:id", controller.obtenerPorId);
  router.delete("/:id", controller.eliminar);
  return router;
};
