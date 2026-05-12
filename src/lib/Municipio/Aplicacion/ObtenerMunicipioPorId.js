class ObtenerMunicipioPorId {
  constructor(municipioRepository) { this.municipioRepository = municipioRepository; }
  async ejecutar(id) { return await this.municipioRepository.findById(id); }
}

module.exports = ObtenerMunicipioPorId;
