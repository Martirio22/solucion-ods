class Municipio {
  constructor({ id, nombre, emailContacto, telefono, reportesActivos }) {
    if (!nombre) throw new Error("El nombre del municipio es requerido");

    this.id = id;
    this.nombre = nombre.trim();
    this.emailContacto = emailContacto || null;
    this.telefono = telefono || null;
    this.reportesActivos = Number(reportesActivos || 0);
  }
}

module.exports = Municipio;
