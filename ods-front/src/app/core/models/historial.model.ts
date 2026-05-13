export type EstadoReporte = 'pendiente' | 'en_revision' | 'escalado' | 'resuelto' | 'rechazado';

export interface HistorialEstado {
  id: string;
  reporteId: string;
  estadoAnterior?: EstadoReporte;
  estadoNuevo: EstadoReporte;
  comentario?: string;
  createdAt: string;
  updatedAt: string;
}
