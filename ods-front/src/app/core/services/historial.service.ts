import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { HistorialEstado } from '../models/historial.model';

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private http = inject(HttpClient);
  private base = '/api/historial-estados';

  getAll(): Observable<ApiResponse<HistorialEstado[]>> {
    return this.http.get<ApiResponse<HistorialEstado[]>>(this.base);
  }
}
