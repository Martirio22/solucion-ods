class ConfirmarReporte {
  constructor(confirmacionRepository, reporteRepository, historialRepository, oficioRepository) {
    this.confirmacionRepository = confirmacionRepository;
    this.reporteRepository = reporteRepository;
    this.historialRepository = historialRepository;
    this.oficioRepository = oficioRepository;
  }

  construirContenidoOficio(reporte) {
    return `
Señores:
${reporte.municipio?.nombre || "Municipio correspondiente"}

Por medio del presente, se informa que a través de la plataforma AguaAlerta se ha registrado un reporte ciudadano relacionado con:

Tipo de problema: ${reporte.tipoProblema?.nombre || "No especificado"}
Descripción: ${reporte.descripcion || "Sin descripción adicional"}
Ubicación aproximada:
Latitud: ${reporte.latitud}
Longitud: ${reporte.longitud}
Dirección de referencia: ${reporte.direccionReferencia || "No registrada"}

El reporte cuenta actualmente con ${reporte.confirmaciones} confirmación(es) ciudadana(s).

Solicitamos de manera respetuosa que se revise el caso y se realicen las acciones correspondientes.

Atentamente,
Plataforma AguaAlerta
    `.trim();
  }

  async ejecutar(reporteId, data) {
    try {
      const existente = await this.reporteRepository.findById(reporteId);
      if (!existente) throw new Error("Reporte no encontrado");

      const confirmacion = await this.confirmacionRepository.save({
        reporteId,
        usuarioId: data.usuarioId || null,
        ipHash: data.ipHash || null,
        dispositivoHash: data.dispositivoHash || null
      });

      let reporte = await this.reporteRepository.incrementarConfirmaciones(reporteId);
      const umbral = reporte.tipoProblema?.umbralAlerta || 5;
      let oficioGenerado = null;

      if (reporte.confirmaciones >= umbral && reporte.estado === "pendiente") {
        reporte = await this.reporteRepository.cambiarEstado(reporteId, "escalado", "alta");

        await this.historialRepository.save({
          reporteId,
          estadoAnterior: "pendiente",
          estadoNuevo: "escalado",
          comentario: "Reporte escalado automáticamente por superar el umbral de confirmaciones"
        });

        const yaTieneOficio = await this.oficioRepository.existsByReporte(reporteId);
        if (!yaTieneOficio) {
          oficioGenerado = await this.oficioRepository.save({
            reporteId,
            municipioId: reporte.municipioId,
            numeroOficio: `AA-${new Date().getFullYear()}-${Date.now()}`,
            asunto: `Solicitud de atención ciudadana por ${reporte.tipoProblema?.nombre || "problema de agua"}`,
            contenido: this.construirContenidoOficio(reporte),
            estado: "generado"
          });
        }
      }

      return { confirmacion, reporte, oficioGenerado };
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Este reporte ya fue confirmado desde este usuario o dispositivo");
      }
      throw error;
    }
  }
}
module.exports = ConfirmarReporte;
