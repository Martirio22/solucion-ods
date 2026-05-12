class IConfirmacionRepository {
  async save(data) { throw new Error("Método save no implementado"); }
  async findAll() { throw new Error("Método findAll no implementado"); }
  async findById(id) { throw new Error("Método findById no implementado"); }
  async findByReporte(reporteId) { throw new Error("Método findByReporte no implementado"); }
  async delete(id) { throw new Error("Método delete no implementado"); }
}
module.exports = IConfirmacionRepository;
