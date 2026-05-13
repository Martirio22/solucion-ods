import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { TipoProblema } from '../models/tipo-problema.model';

@Injectable({ providedIn: 'root' })
export class TipoProblemaService {
  private http = inject(HttpClient);
  private base = '/api/tipos-problema';

  getAll(): Observable<ApiResponse<TipoProblema[]>> {
    return this.http.get<ApiResponse<TipoProblema[]>>(this.base);
  }

  getById(id: string): Observable<ApiResponse<TipoProblema>> {
    return this.http.get<ApiResponse<TipoProblema>>(`${this.base}/${id}`);
  }

  create(data: Partial<TipoProblema>): Observable<ApiResponse<TipoProblema>> {
    return this.http.post<ApiResponse<TipoProblema>>(this.base, data);
  }

  update(id: string, data: Partial<TipoProblema>): Observable<ApiResponse<TipoProblema>> {
    return this.http.put<ApiResponse<TipoProblema>>(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.base}/${id}`);
  }
}
