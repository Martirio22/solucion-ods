import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OficioService } from '../../core/services/oficio.service';
import { Oficio } from '../../core/models/oficio.model';
import { Reporte } from '../../core/models/reporte.model';
import { Municipio } from '../../core/models/municipio.model';

@Component({
  selector: 'app-oficios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './oficios.component.html',
})
export class OficiosComponent implements OnInit {
  private service = inject(OficioService);

  oficios = signal<Oficio[]>([]);
  loading = signal(true);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: r => { this.oficios.set(r.data ?? []); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  marcarEnviado(id: string): void {
    this.service.marcarEnviado(id).subscribe(() => this.load());
  }

  getReporteId(o: Oficio): string {
    if (typeof o.reporteId === 'object' && o.reporteId !== null) {
      return (o.reporteId as Reporte).id;
    }
    return o.reporteId as string;
  }

  getMunicipioNombre(o: Oficio): string {
    if (typeof o.municipioId === 'object' && o.municipioId !== null) {
      return (o.municipioId as Municipio).nombre;
    }
    return '-';
  }
}
