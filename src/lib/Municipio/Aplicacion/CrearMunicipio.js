const Municipio = require("../Dominio/Entidades/Municipio");

class CrearMunicipio {
  constructor(municipioRepository) { this.municipioRepository = municipioRepository; }

  async ejecutar(data) {
    const municipio = new Municipio(data);
    return await this.municipioRepository.save(municipio);
  }
}

module.exports = CrearMunicipio;
