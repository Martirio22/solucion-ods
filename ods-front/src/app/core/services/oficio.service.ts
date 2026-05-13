import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Oficio } from '../models/oficio.model';

@Injectable({ providedIn: 'root' })
export class OficioService {
  private http = inject(HttpClient);
  private base = '/api/oficios';

  getAll(): Observable<ApiResponse<Oficio[]>> {
    return this.http.get<ApiResponse<Oficio[]>>(this.base);
  }

  getById(id: string): Observable<ApiResponse<Oficio>> {
    return this.http.get<ApiResponse<Oficio>>(`${this.base}/${id}`);
  }

  marcarEnviado(id: string): Observable<ApiResponse<Oficio>> {
    return this.http.put<ApiResponse<Oficio>>(`${this.base}/${id}/marcar-enviado`, {});
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.base}/${id}`);
  }
}
