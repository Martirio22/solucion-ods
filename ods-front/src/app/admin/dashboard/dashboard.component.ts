import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReporteService } from '../../core/services/reporte.service';
import { Reporte, ESTADO_CONFIG, URGENCIA_CONFIG } from '../../core/models/reporte.model';
import { TipoProblema } from '../../core/models/tipo-problema.model';
import { Municipio } from '../../core/models/municipio.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private reporteService = inject(ReporteService);

  todos = signal<Reporte[]>([]);
  escalados = signal<Reporte[]>([]);
  loading = signal(true);

  readonly estadoConfig = ESTADO_CONFIG;
  readonly urgenciaConfig = URGENCIA_CONFIG;

  get total() { return this.todos().length; }
  get pendientes() { return this.todos().filter(r => r.estado === 'pendiente').length; }
  get enRevision() { return this.todos().filter(r => r.estado === 'en_revision').length; }
  get resueltos() { return this.todos().filter(r => r.estado === 'resuelto').length; }

  ngOnInit(): void {
    this.reporteService.getAll().subscribe({
      next: r => {
        this.todos.set(r.data ?? []);
        this.escalados.set((r.data ?? []).filter(x => x.estado === 'escalado'));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  getTipoNombre(reporte: Reporte): string {
    if (typeof reporte.tipoProblemaId === 'object' && reporte.tipoProblemaId !== null) {
      return (reporte.tipoProblemaId as TipoProblema).nombre;
    }
    return '-';
  }

  getMunicipioNombre(reporte: Reporte): string {
    if (typeof reporte.municipioId === 'object' && reporte.municipioId !== null) {
      return (reporte.municipioId as Municipio).nombre;
    }
    return '-';
  }
}
