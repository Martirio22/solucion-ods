export interface Evidencia {
  id: string;
  reporteId: string;
  usuarioId?: string;
  urlArchivo: string;
  tipoArchivo: 'imagen' | 'video' | 'documento';
  descripcion?: string;
  createdAt: string;
  updatedAt: string;
}
