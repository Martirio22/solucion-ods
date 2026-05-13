import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ReporteService } from '../../core/services/reporte.service';
import { OficioService } from '../../core/services/oficio.service';
import { Reporte, ESTADO_CONFIG, URGENCIA_CONFIG, EstadoReporte } from '../../core/models/reporte.model';
import { Evidencia } from '../../core/models/evidencia.model';
import { Oficio } from '../../core/models/oficio.model';
import { HistorialEstado } from '../../core/models/historial.model';

@Component({
  selector: 'app-detalle-reporte-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detalle-reporte-admin.component.html',
})
export class DetalleReporteAdminComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private reporteService = inject(ReporteService);
  private oficioService = inject(OficioService);

  reporte = signal<Reporte | null>(null);
  evidencias = signal<Evidencia[]>([]);
  historial = signal<HistorialEstado[]>([]);
  oficios = signal<Oficio[]>([]);
  loading = signal(true);

  showCambiarEstado = signal(false);
  nuevoEstado = '';
  comentarioEstado = '';
  cambiandoEstado = signal(false);

  generandoOficio = signal(false);
  oficioGenerado = signal<Oficio | null>(null);

  readonly estadoConfig = ESTADO_CONFIG;
  readonly urgenciaConfig = URGENCIA_CONFIG;
  readonly estadoKeys = Object.keys(ESTADO_CONFIG) as EstadoReporte[];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.load(id);
  }

  private load(id: string): void {
    this.reporteService.getById(id).subscribe(r => {
      this.reporte.set(r.data ?? null);
      this.loading.set(false);
    });
    this.reporteService.getEvidencias(id).subscribe(r => this.evidencias.set(r.data ?? []));
    this.reporteService.getHistorial(id).subscribe(r => this.historial.set(r.data ?? []));
    this.reporteService.getOficios(id).subscribe(r => this.oficios.set(r.data ?? []));
  }

  cambiarEstado(): void {
    if (!this.nuevoEstado || !this.reporte()) return;
    this.cambiandoEstado.set(true);
    this.reporteService
      .cambiarEstado(this.reporte()!.id, { estadoNuevo: this.nuevoEstado, comentario: this.comentarioEstado })
      .subscribe({
        next: r => {
          this.reporte.set(r.data ?? null);
          this.showCambiarEstado.set(false);
          this.cambiandoEstado.set(false);
          this.nuevoEstado = '';
          this.comentarioEstado = '';
          this.reporteService.getHistorial(this.reporte()!.id).subscribe(h => this.historial.set(h.data ?? []));
        },
        error: () => this.cambiandoEstado.set(false),
      });
  }

  generarOficio(): void {
    if (!this.reporte()) return;
    this.generandoOficio.set(true);
    this.reporteService.generarOficio(this.reporte()!.id).subscribe({
      next: r => {
        this.generandoOficio.set(false);
        this.oficioGenerado.set(r.data ?? null);
        this.reporteService.getOficios(this.reporte()!.id).subscribe(o => this.oficios.set(o.data ?? []));
      },
      error: () => this.generandoOficio.set(false),
    });
  }

  marcarOficioEnviado(oficioId: string): void {
    this.oficioService.marcarEnviado(oficioId).subscribe(() => {
      this.reporteService.getOficios(this.reporte()!.id).subscribe(o => this.oficios.set(o.data ?? []));
    });
  }

  getTipoNombre(): string {
    return this.reporte()?.tipoProblema?.nombre ?? '-';
  }

  getMunicipioNombre(): string {
    return this.reporte()?.municipio?.nombre ?? '-';
  }
}
