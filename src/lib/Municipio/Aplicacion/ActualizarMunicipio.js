const Municipio = require("../Dominio/Entidades/Municipio");

class ActualizarMunicipio {
  constructor(municipioRepository) { this.municipioRepository = municipioRepository; }

  async ejecutar(id, data) {
    const municipio = new Municipio({
      id,
      nombre: data.nombre,
      emailContacto: data.emailContacto,
      telefono: data.telefono,
      reportesActivos: data.reportesActivos
    });
    return await this.municipioRepository.update(id, municipio);
  }
}

module.exports = ActualizarMunicipio;
