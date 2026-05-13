import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ReporteService } from '../../core/services/reporte.service';
import { MunicipioService } from '../../core/services/municipio.service';
import { TipoProblemaService } from '../../core/services/tipo-problema.service';
import { Reporte, ESTADO_CONFIG, URGENCIA_CONFIG, EstadoReporte } from '../../core/models/reporte.model';
import { Municipio } from '../../core/models/municipio.model';
import { TipoProblema } from '../../core/models/tipo-problema.model';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reportes.component.html',
})
export class ReportesComponent implements OnInit {
  private reporteService = inject(ReporteService);
  private municipioService = inject(MunicipioService);
  private tipoProblemaService = inject(TipoProblemaService);
  private route = inject(ActivatedRoute);

  reportes = signal<Reporte[]>([]);
  municipios = signal<Municipio[]>([]);
  tipos = signal<TipoProblema[]>([]);
  loading = signal(true);

  filters = { estado: '', municipioId: '', tipoProblemaId: '', nivelUrgencia: '' };

  readonly estadoConfig = ESTADO_CONFIG;
  readonly urgenciaConfig = URGENCIA_CONFIG;
  readonly estadoKeys = Object.keys(ESTADO_CONFIG) as EstadoReporte[];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['estado']) this.filters.estado = params['estado'];
      this.load();
    });
    this.municipioService.getAll().subscribe(r => this.municipios.set(r.data ?? []));
    this.tipoProblemaService.getAll().subscribe(r => this.tipos.set(r.data ?? []));
  }

  load(): void {
    this.loading.set(true);
    const f: Record<string, string> = {};
    if (this.filters.estado) f['estado'] = this.filters.estado;
    if (this.filters.municipioId) f['municipioId'] = this.filters.municipioId;
    if (this.filters.tipoProblemaId) f['tipoProblemaId'] = this.filters.tipoProblemaId;

    this.reporteService.getAll(f).subscribe({
      next: r => { this.reportes.set(r.data ?? []); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  clearFilters(): void {
    this.filters = { estado: '', municipioId: '', tipoProblemaId: '', nivelUrgencia: '' };
    this.load();
  }

  getTipoNombre(reporte: Reporte): string {
    return reporte.tipoProblema?.nombre ?? '-';
  }

  getMunicipioNombre(reporte: Reporte): string {
    return reporte.municipio?.nombre ?? '-';
  }
}
