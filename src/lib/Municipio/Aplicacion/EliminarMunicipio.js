class EliminarMunicipio {
  constructor(municipioRepository) { this.municipioRepository = municipioRepository; }
  async ejecutar(id) { return await this.municipioRepository.delete(id); }
}

module.exports = EliminarMunicipio;
