class Usuario {
  constructor({ id, nombre, email, telefono, esAnonimo }) {
    this.id = id;
    this.nombre = nombre || "Ciudadano anónimo";
    this.email = email || null;
    this.telefono = telefono || null;
    this.esAnonimo = Boolean(esAnonimo);
  }
}

module.exports = Usuario;
