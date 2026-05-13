import { Municipio } from './municipio.model';
import { Reporte } from './reporte.model';

export interface Oficio {
  id: string;
  reporteId: Reporte | string;
  municipioId: Municipio | string;
  numeroOficio?: string;
  asunto: string;
  contenido: string;
  archivoUrl?: string;
  estado: 'generado' | 'descargado' | 'enviado' | 'fallido';
  fechaEnvio?: string;
  createdAt: string;
  updatedAt: string;
}
