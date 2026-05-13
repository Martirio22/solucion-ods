import { Municipio } from './municipio.model';
import { TipoProblema } from './tipo-problema.model';

export type EstadoReporte = 'pendiente' | 'en_revision' | 'escalado' | 'resuelto' | 'rechazado';
export type NivelUrgencia = 'baja' | 'media' | 'alta' | 'critica';

export interface Reporte {
  id: string;
  usuarioId?: string;
  tipoProblemaId: string;
  municipioId: string;
  tipoProblema?: TipoProblema;
  municipio?: Municipio;
  descripcion?: string;
  latitud: number;
  longitud: number;
  direccionReferencia?: string;
  estado: EstadoReporte;
  nivelUrgencia: NivelUrgencia;
  confirmaciones: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ESTADO_CONFIG: Record<EstadoReporte, { color: string; bg: string; text: string; label: string }> = {
  pendiente:   { color: '#3B82F6', bg: 'bg-blue-100',   text: 'text-blue-800',   label: 'Pendiente' },
  en_revision: { color: '#F59E0B', bg: 'bg-amber-100',  text: 'text-amber-800',  label: 'En revisión' },
  escalado:    { color: '#EF4444', bg: 'bg-red-100',    text: 'text-red-800',    label: 'Escalado' },
  resuelto:    { color: '#10B981', bg: 'bg-green-100',  text: 'text-green-800',  label: 'Resuelto' },
  rechazado:   { color: '#6B7280', bg: 'bg-gray-100',   text: 'text-gray-800',   label: 'Rechazado' },
};

export const URGENCIA_CONFIG: Record<NivelUrgencia, { bg: string; text: string; label: string }> = {
  baja:    { bg: 'bg-green-100',   text: 'text-green-800',   label: 'Baja' },
  media:   { bg: 'bg-yellow-100',  text: 'text-yellow-800',  label: 'Media' },
  alta:    { bg: 'bg-orange-100',  text: 'text-orange-800',  label: 'Alta' },
  critica: { bg: 'bg-red-100',     text: 'text-red-800',     label: 'Crítica' },
};
