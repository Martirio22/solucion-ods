import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../core/services/reporte.service';
import { MunicipioService } from '../../core/services/municipio.service';
import { TipoProblemaService } from '../../core/services/tipo-problema.service';
import { Municipio } from '../../core/models/municipio.model';
import { TipoProblema } from '../../core/models/tipo-problema.model';
import { NivelUrgencia } from '../../core/models/reporte.model';

@Component({
  selector: 'app-crear-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-reporte.component.html',
})
export class CrearReporteComponent implements OnInit {
  @Input() lat!: number;
  @Input() lng!: number;
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  private reporteService = inject(ReporteService);
  private municipioService = inject(MunicipioService);
  private tipoProblemaService = inject(TipoProblemaService);

  municipios = signal<Municipio[]>([]);
  tipos = signal<TipoProblema[]>([]);
  saving = signal(false);
  error = signal('');

  form = {
    tipoProblemaId: '',
    municipioId: '',
    descripcion: '',
    direccionReferencia: '',
    nivelUrgencia: 'baja' as NivelUrgencia,
  };

  private iconMap: Record<string, string> = {
    'droplet-off': '💧',
    'alert-triangle': '⚠️',
    'x-circle': '🚫',
    'trash': '🗑️',
    'flask': '🧪',
  };

  iconEmoji(icono: string | undefined): string {
    if (!icono) return '📋';
    return this.iconMap[icono] ?? '📋';
  }

  ngOnInit(): void {
    this.municipioService.getAll().subscribe(r => this.municipios.set(r.data ?? []));
    this.tipoProblemaService.getAll().subscribe(r => this.tipos.set(r.data ?? []));
  }

  submit(): void {
    if (!this.form.tipoProblemaId || !this.form.municipioId) {
      this.error.set('Tipo de problema y municipio son obligatorios.');
      return;
    }
    this.saving.set(true);
    this.error.set('');

    this.reporteService
      .create({
        ...this.form,
        latitud: this.lat,
        longitud: this.lng,
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.created.emit();
        },
        error: err => {
          this.saving.set(false);
          this.error.set(err?.error?.message ?? 'Error al crear el reporte. Inténtalo de nuevo.');
        },
      });
  }
}
