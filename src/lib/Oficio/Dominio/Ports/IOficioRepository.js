class IOficioRepository {
  async save(data) { throw new Error("Método save no implementado"); }
  async findAll() { throw new Error("Método findAll no implementado"); }
  async findById(id) { throw new Error("Método findById no implementado"); }
  async findByReporte(reporteId) { throw new Error("Método findByReporte no implementado"); }
  async existsByReporte(reporteId) { throw new Error("Método existsByReporte no implementado"); }
  async marcarEnviado(id) { throw new Error("Método marcarEnviado no implementado"); }
  async delete(id) { throw new Error("Método delete no implementado"); }
}
module.exports = IOficioRepository;
