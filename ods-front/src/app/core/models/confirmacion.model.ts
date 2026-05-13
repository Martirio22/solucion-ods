export interface Confirmacion {
  id: string;
  reporteId: string;
  usuarioId?: string;
  ipHash?: string;
  dispositivoHash?: string;
  createdAt: string;
  updatedAt: string;
}
