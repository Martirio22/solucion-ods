import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Reporte } from '../models/reporte.model';
import { Confirmacion } from '../models/confirmacion.model';
import { Evidencia } from '../models/evidencia.model';
import { Oficio } from '../models/oficio.model';
import { HistorialEstado } from '../models/historial.model';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private http = inject(HttpClient);
  private base = '/api/reportes';

  getAll(filters?: Record<string, string>): Observable<ApiResponse<Reporte[]>> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => { if (v) params = params.set(k, v); });
    }
    return this.http.get<ApiResponse<Reporte[]>>(this.base, { params });
  }

  getById(id: string): Observable<ApiResponse<Reporte>> {
    return this.http.get<ApiResponse<Reporte>>(`${this.base}/${id}`);
  }

  create(data: Partial<Reporte>): Observable<ApiResponse<Reporte>> {
    return this.http.post<ApiResponse<Reporte>>(this.base, data);
  }

  update(id: string, data: Partial<Reporte>): Observable<ApiResponse<Reporte>> {
    return this.http.put<ApiResponse<Reporte>>(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.base}/${id}`);
  }

  confirmar(id: string, body: { dispositivoHash: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.base}/${id}/confirmar`, body);
  }

  agregarEvidencia(id: string, data: Partial<Evidencia>): Observable<ApiResponse<Evidencia>> {
    return this.http.post<ApiResponse<Evidencia>>(`${this.base}/${id}/evidencias`, data);
  }

  generarOficio(id: string): Observable<ApiResponse<Oficio>> {
    return this.http.post<ApiResponse<Oficio>>(`${this.base}/${id}/generar-oficio`, {});
  }

  cambiarEstado(id: string, data: { estadoNuevo: string; comentario?: string }): Observable<ApiResponse<Reporte>> {
    return this.http.put<ApiResponse<Reporte>>(`${this.base}/${id}/cambiar-estado`, data);
  }

  getConfirmaciones(id: string): Observable<ApiResponse<Confirmacion[]>> {
    return this.http.get<ApiResponse<Confirmacion[]>>(`${this.base}/${id}/confirmaciones`);
  }

  getEvidencias(id: string): Observable<ApiResponse<Evidencia[]>> {
    return this.http.get<ApiResponse<Evidencia[]>>(`${this.base}/${id}/evidencias`);
  }

  getHistorial(id: string): Observable<ApiResponse<HistorialEstado[]>> {
    return this.http.get<ApiResponse<HistorialEstado[]>>(`${this.base}/${id}/historial`);
  }

  getOficios(id: string): Observable<ApiResponse<Oficio[]>> {
    return this.http.get<ApiResponse<Oficio[]>>(`${this.base}/${id}/oficios`);
  }
}
