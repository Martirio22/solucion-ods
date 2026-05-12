class GenerarOficioReporte {
  constructor(reporteRepository, oficioRepository, historialRepository) {
    this.reporteRepository = reporteRepository;
    this.oficioRepository = oficioRepository;
    this.historialRepository = historialRepository;
  }

  construirContenido(reporte) {
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

  async ejecutar(reporteId) {
    const reporte = await this.reporteRepository.findById(reporteId);
    if (!reporte) throw new Error("Reporte no encontrado");

    const yaTieneOficio = await this.oficioRepository.existsByReporte(reporteId);
    if (yaTieneOficio) throw new Error("Este reporte ya tiene un oficio generado");

    const oficio = await this.oficioRepository.save({
      reporteId,
      municipioId: reporte.municipioId,
      numeroOficio: `AA-${new Date().getFullYear()}-${Date.now()}`,
      asunto: `Solicitud de atención ciudadana por ${reporte.tipoProblema?.nombre || "problema de agua"}`,
      contenido: this.construirContenido(reporte),
      estado: "generado"
    });

    if (reporte.estado !== "escalado") {
      await this.reporteRepository.cambiarEstado(reporteId, "escalado", "alta");
      await this.historialRepository.save({
        reporteId,
        estadoAnterior: reporte.estado,
        estadoNuevo: "escalado",
        comentario: "Oficio generado para el municipio"
      });
    }

    return oficio;
  }
}
module.exports = GenerarOficioReporte;
