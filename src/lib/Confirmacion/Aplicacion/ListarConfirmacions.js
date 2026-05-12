class ListarConfirmacions {
  constructor(confirmacionRepository) { this.confirmacionRepository = confirmacionRepository; }
  async ejecutar() { return await this.confirmacionRepository.findAll(); }
}
module.exports = ListarConfirmacions;
