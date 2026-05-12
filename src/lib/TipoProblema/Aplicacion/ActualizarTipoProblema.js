const TipoProblema = require("../Dominio/Entidades/TipoProblema");

class ActualizarTipoProblema {
  constructor(tipoProblemaRepository) { this.tipoProblemaRepository = tipoProblemaRepository; }

  async ejecutar(id, data) {
    const tipoProblema = new TipoProblema({
      id,
      nombre: data.nombre,
      icono: data.icono,
      umbralAlerta: data.umbralAlerta
    });
    return await this.tipoProblemaRepository.update(id, tipoProblema);
  }
}

module.exports = ActualizarTipoProblema;
