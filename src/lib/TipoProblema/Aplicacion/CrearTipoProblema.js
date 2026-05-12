const TipoProblema = require("../Dominio/Entidades/TipoProblema");

class CrearTipoProblema {
  constructor(tipoProblemaRepository) { this.tipoProblemaRepository = tipoProblemaRepository; }

  async ejecutar(data) {
    const tipoProblema = new TipoProblema(data);
    return await this.tipoProblemaRepository.save(tipoProblema);
  }
}

module.exports = CrearTipoProblema;
