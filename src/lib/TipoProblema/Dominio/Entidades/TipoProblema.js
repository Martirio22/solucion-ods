class TipoProblema {
  constructor({ id, nombre, icono, umbralAlerta }) {
    if (!nombre) throw new Error("El nombre del tipo de problema es requerido");

    const umbral = Number(umbralAlerta || 5);

    if (!Number.isInteger(umbral) || umbral <= 0) {
      throw new Error("El umbral de alerta debe ser mayor a cero");
    }

    this.id = id;
    this.nombre = nombre.trim();
    this.icono = icono || null;
    this.umbralAlerta = umbral;
  }
}

module.exports = TipoProblema;
