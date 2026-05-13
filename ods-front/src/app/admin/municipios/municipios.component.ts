import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MunicipioService } from '../../core/services/municipio.service';
import { Municipio } from '../../core/models/municipio.model';

@Component({
  selector: 'app-municipios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './municipios.component.html',
})
export class MunicipiosComponent implements OnInit {
  private service = inject(MunicipioService);

  municipios = signal<Municipio[]>([]);
  loading = signal(true);
  showModal = signal(false);
  saving = signal(false);
  editing = signal<Municipio | null>(null);
  error = signal('');

  form = { nombre: '', emailContacto: '', telefono: '' };

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: r => { this.municipios.set(r.data ?? []); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openCreate(): void {
    this.editing.set(null);
    this.form = { nombre: '', emailContacto: '', telefono: '' };
    this.error.set('');
    this.showModal.set(true);
  }

  openEdit(m: Municipio): void {
    this.editing.set(m);
    this.form = { nombre: m.nombre, emailContacto: m.emailContacto ?? '', telefono: m.telefono ?? '' };
    this.error.set('');
    this.showModal.set(true);
  }

  save(): void {
    if (!this.form.nombre.trim()) { this.error.set('El nombre es obligatorio.'); return; }
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
    if (!confirm('¿Seguro que deseas eliminar este municipio?')) return;
    this.service.delete(id).subscribe(() => this.load());
  }
}
