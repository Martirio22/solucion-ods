import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoProblemaService } from '../../core/services/tipo-problema.service';
import { TipoProblema } from '../../core/models/tipo-problema.model';

@Component({
  selector: 'app-tipos-problema',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipos-problema.component.html',
})
export class TiposProblemaComponent implements OnInit {
  private service = inject(TipoProblemaService);

  tipos = signal<TipoProblema[]>([]);
  loading = signal(true);
  showModal = signal(false);
  saving = signal(false);
  editing = signal<TipoProblema | null>(null);
  error = signal('');

  form = { nombre: '', icono: '', umbralAlerta: 5 };

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: r => { this.tipos.set(r.data ?? []); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.editing.set(null);
    this.form = { nombre: '', icono: '', umbralAlerta: 5 };
    this.error.set('');
    this.showModal.set(true);
  }

  openEdit(t: TipoProblema): void {
    this.editing.set(t);
    this.form = { nombre: t.nombre, icono: t.icono ?? '', umbralAlerta: t.umbralAlerta };
    this.error.set('');
    this.showModal.set(true);
  }

  save(): void {
    if (!this.form.nombre.trim()) { this.error.set('El nombre es obligatorio.'); return; }
    if (this.form.umbralAlerta < 1) { this.error.set('El umbral debe ser al menos 1.'); return; }
    this.saving.set(true);
    this.error.set('');
    const req = this.editing()
      ? this.service.update(this.editing()!.id, this.form)
      : this.service.create(this.form);

    req.subscribe({
      next: () => { this.saving.set(false); this.showModal.set(false); this.load(); },
      error: err => { this.saving.set(false); this.error.set(err?.error?.message ?? 'Error al guardar.'); },
    });
  }

  delete(id: string): void {
    if (!confirm('¿Seguro que deseas eliminar este tipo de problema?')) return;
    this.service.delete(id).subscribe(() => this.load());
  }
}
