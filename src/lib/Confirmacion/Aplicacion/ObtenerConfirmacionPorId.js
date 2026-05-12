class ObtenerConfirmacionPorId {
  constructor(confirmacionRepository) { this.confirmacionRepository = confirmacionRepository; }
  async ejecutar(id) { return await this.confirmacionRepository.findById(id); }
}
module.exports = ObtenerConfirmacionPorId;
