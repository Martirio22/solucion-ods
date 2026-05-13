export interface TipoProblema {
  id: string;
  nombre: string;
  icono?: string;
  umbralAlerta: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}
