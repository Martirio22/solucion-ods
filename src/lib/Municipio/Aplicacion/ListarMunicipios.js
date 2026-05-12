class ListarMunicipios {
  constructor(municipioRepository) { this.municipioRepository = municipioRepository; }
  async ejecutar() { return await this.municipioRepository.findAll(); }
}

module.exports = ListarMunicipios;
