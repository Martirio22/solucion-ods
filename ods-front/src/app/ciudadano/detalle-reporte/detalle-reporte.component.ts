import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../core/services/reporte.service';
import { Reporte, ESTADO_CONFIG, URGENCIA_CONFIG } from '../../core/models/reporte.model';
import { Evidencia } from '../../core/models/evidencia.model';

function getDeviceHash(): string {
  const data = [navigator.userAgent, screen.width, screen.height, navigator.language].join('|');
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

@Component({
  selector: 'app-detalle-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-reporte.component.html',
})
export class DetalleReporteComponent implements OnInit, OnChanges {
  @Input() reporte!: Reporte;
  @Output() close = new EventEmitter<void>();
  @Output() refreshMap = new EventEmitter<void>();

  private reporteService = inject(ReporteService);

  evidencias = signal<Evidencia[]>([]);
  confirmando = signal(false);
  confirmado = signal(false);
  confirmError = signal('');
  urlEvidencia = '';
  agregandoEvidencia = signal(false);

  readonly estadoConfig = ESTADO_CONFIG;
  readonly urgenciaConfig = URGENCIA_CONFIG;

  ngOnInit(): void {
    this.cargarEvidencias();
  }

  ngOnChanges(): void {
    this.cargarEvidencias();
    this.confirmado.set(false);
    this.confirmError.set('');
  }

  private cargarEvidencias(): void {
    if (!this.reporte?.id) return;
    this.reporteService.getEvidencias(this.reporte.id).subscribe(r => this.evidencias.set(r.data ?? []));
  }

  confirmar(): void {
    this.confirmando.set(true);
    this.confirmError.set('');
    this.reporteService
      .confirmar(this.reporte.id, { dispositivoHash: getDeviceHash() })
      .subscribe({
        next: () => {
          this.confirmando.set(false);
          this.confirmado.set(true);
          this.refreshMap.emit();
        },
        error: err => {
          this.confirmando.set(false);
          this.confirmError.set(err?.error?.message ?? 'No se pudo confirmar. Ya lo habrás reportado antes.');
        },
      });
  }

  agregarEvidencia(): void {
    if (!this.urlEvidencia.trim()) return;
    this.agregandoEvidencia.set(true);
    this.reporteService
      .agregarEvidencia(this.reporte.id, {
        urlArchivo: this.urlEvidencia.trim(),
        tipoArchivo: 'imagen',
      })
      .subscribe({
        next: () => {
          this.urlEvidencia = '';
          this.agregandoEvidencia.set(false);
          this.cargarEvidencias();
        },
        error: () => this.agregandoEvidencia.set(false),
      });
  }

  getTipoNombre(): string {
    return this.reporte.tipoProblema?.nombre ?? 'Problema de agua';
  }

  getMunicipioNombre(): string {
    return this.reporte.municipio?.nombre ?? '-';
  }
}
