const { connection, disconnect } = require("./Infraestructura/database/Mongo");
const MunicipioModel = require("./lib/Municipio/Infraestructura/MunicipioModel");
const TipoProblemaModel = require("./lib/TipoProblema/Infraestructura/TipoProblemaModel");
const UsuarioModel = require("./lib/Usuario/Infraestructura/UsuarioModel");

async function seed() {
  await connection();

  await MunicipioModel.insertMany([
    { nombre: "Quito", emailContacto: "reportes@quito.gob.ec", telefono: "023000000" },
    { nombre: "Guayaquil", emailContacto: "reportes@guayaquil.gob.ec", telefono: "043000000" },
    { nombre: "Cuenca", emailContacto: "reportes@cuenca.gob.ec", telefono: "073000000" },
    { nombre: "Ambato", emailContacto: "reportes@ambato.gob.ec", telefono: "032000000" },
    { nombre: "Machala", emailContacto: "reportes@machala.gob.ec", telefono: "072000000" }
  ], { ordered: false }).catch(() => {});

  await TipoProblemaModel.insertMany([
    { nombre: "Fuga de tubería", icono: "droplet-off", umbralAlerta: 3 },
    { nombre: "Agua contaminada", icono: "alert-triangle", umbralAlerta: 5 },
    { nombre: "Sin acceso al agua", icono: "x-circle", umbralAlerta: 4 },
    { nombre: "Alcantarilla obstruida", icono: "trash", umbralAlerta: 3 },
    { nombre: "Pozo contaminado", icono: "flask", umbralAlerta: 5 }
  ], { ordered: false }).catch(() => {});

  await UsuarioModel.create({ nombre: "Ciudadano anónimo", esAnonimo: true }).catch(() => {});

  console.log("Datos iniciales creados correctamente");
  await disconnect();
}

seed().catch(async (err) => {
  console.error(err);
  await disconnect();
  process.exit(1);
});
