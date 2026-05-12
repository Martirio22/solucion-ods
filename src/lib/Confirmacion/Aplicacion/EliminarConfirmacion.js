class EliminarConfirmacion {
  constructor(confirmacionRepository) { this.confirmacionRepository = confirmacionRepository; }
  async ejecutar(id) { return await this.confirmacionRepository.delete(id); }
}
module.exports = EliminarConfirmacion;
