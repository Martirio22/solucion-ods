class IReporteRepository {
  async save(reporte) { throw new Error("Método save no implementado"); }
  async findAll(filters) { throw new Error("Método findAll no implementado"); }
  async findById(id) { throw new Error("Método findById no implementado"); }
  async update(id, reporte) { throw new Error("Método update no implementado"); }
  async delete(id) { throw new Error("Método delete no implementado"); }
  async incrementarConfirmaciones(id) { throw new Error("Método incrementarConfirmaciones no implementado"); }
  async cambiarEstado(id, estado, nivelUrgencia) { throw new Error("Método cambiarEstado no implementado"); }
}

module.exports = IReporteRepository;
