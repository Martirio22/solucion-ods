const buildApp = require("./app");
const { connection } = require("./Infraestructura/database/Mongo");

async function start() {
  try {
    const port = Number(process.env.PORT) || 3977;

    await connection();

    const app = buildApp();

    app.listen(port, () => {
      console.log("Servidor AguaAlerta corriendo correctamente en el puerto: " + port);
    });
  } catch (error) {
    console.error("Fallo al iniciar la aplicación:", error);
    process.exit(1);
  }
}

start();
