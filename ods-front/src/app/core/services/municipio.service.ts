import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Municipio } from '../models/municipio.model';

@Injectable({ providedIn: 'root' })
export class MunicipioService {
  private http = inject(HttpClient);
  private base = '/api/municipios';

  getAll(): Observable<ApiResponse<Municipio[]>> {
    return this.http.get<ApiResponse<Municipio[]>>(this.base);
  }

  getById(id: string): Observable<ApiResponse<Municipio>> {
    return this.http.get<ApiResponse<Municipio>>(`${this.base}/${id}`);
  }

  create(data: Partial<Municipio>): Observable<ApiResponse<Municipio>> {
    return this.http.post<ApiResponse<Municipio>>(this.base, data);
  }

  update(id: string, data: Partial<Municipio>): Observable<ApiResponse<Municipio>> {
    return this.http.put<ApiResponse<Municipio>>(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.base}/${id}`);
  }
}
