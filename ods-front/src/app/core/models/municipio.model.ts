export interface Municipio {
  id: string;
  nombre: string;
  emailContacto?: string;
  telefono?: string;
  reportesActivos: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}
