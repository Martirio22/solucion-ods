import {
  Component,
  AfterViewInit,
  OnDestroy,
  inject,
  signal,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';
import { ReporteService } from '../../core/services/reporte.service';
import { MunicipioService } from '../../core/services/municipio.service';
import { TipoProblemaService } from '../../core/services/tipo-problema.service';
import { Reporte, ESTADO_CONFIG, EstadoReporte } from '../../core/models/reporte.model';
import { Municipio } from '../../core/models/municipio.model';
import { TipoProblema } from '../../core/models/tipo-problema.model';
import { CrearReporteComponent } from '../crear-reporte/crear-reporte.component';
import { DetalleReporteComponent } from '../detalle-reporte/detalle-reporte.component';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CrearReporteComponent, DetalleReporteComponent],
  templateUrl: './mapa.component.html',
})
export class MapaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private reporteService = inject(ReporteService);
  private municipioService = inject(MunicipioService);
  private tipoProblemaService = inject(TipoProblemaService);
  private cdr = inject(ChangeDetectorRef);

  map!: L.Map;
  markers: L.CircleMarker[] = [];

  reportes = signal<Reporte[]>([]);
  municipios = signal<Municipio[]>([]);
  tipos = signal<TipoProblema[]>([]);
  loading = signal(true);

  selectedReporte = signal<Reporte | null>(null);
  showCrearReporte = signal(false);
  selectingLocation = signal(false);
  pendingLatLng = signal<{ lat: number; lng: number } | null>(null);

  filters = { estado: '', municipioId: '', tipoProblemaId: '' };

  readonly estadoConfig = ESTADO_CONFIG;
  readonly estadoKeys = Object.keys(ESTADO_CONFIG) as EstadoReporte[];

  ngAfterViewInit(): void {
    this.initMap();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [4.6097, -74.0817],
      zoom: 6,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.map);

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (!this.selectingLocation()) return;
      this.pendingLatLng.set({ lat: e.latlng.lat, lng: e.latlng.lng });
      this.selectingLocation.set(false);
      this.showCrearReporte.set(true);
      this.cdr.detectChanges();
    });
  }

  private loadData(): void {
    this.municipioService.getAll().subscribe(r => this.municipios.set(r.data ?? []));
    this.tipoProblemaService.getAll().subscribe(r => this.tipos.set(r.data ?? []));
    this.loadReportes();
  }

  loadReportes(): void {
    this.loading.set(true);
    const f: Record<string, string> = {};
    if (this.filters.estado) f['estado'] = this.filters.estado;
    if (this.filters.municipioId) f['municipioId'] = this.filters.municipioId;
    if (this.filters.tipoProblemaId) f['tipoProblemaId'] = this.filters.tipoProblemaId;

    this.reporteService.getAll(f).subscribe({
      next: r => {
        this.reportes.set(r.data ?? []);
        this.renderMarkers();
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: () => this.loading.set(false),
    });
  }

  private renderMarkers(): void {
    this.markers.forEach(m => m.remove());
    this.markers = [];

    this.reportes().forEach(reporte => {
      const cfg = ESTADO_CONFIG[reporte.estado];
      const marker = L.circleMarker([reporte.latitud, reporte.longitud], {
        radius: 10,
        fillColor: cfg.color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      })
        .addTo(this.map)
        .bindTooltip(this.getTipoNombre(reporte), { permanent: false, direction: 'top' });

      marker.on('click', () => {
        this.selectedReporte.set(reporte);
        this.cdr.detectChanges();
      });

      this.markers.push(marker);
    });
  }

  startCrearReporte(): void {
    this.selectedReporte.set(null);
    this.selectingLocation.set(true);
    this.map.getContainer().style.cursor = 'crosshair';
  }

  cancelSelectingLocation(): void {
    this.selectingLocation.set(false);
    this.map.getContainer().style.cursor = '';
  }

  onReporteCreated(): void {
    this.showCrearReporte.set(false);
    this.map.getContainer().style.cursor = '';
    this.loadReportes();
  }

  onCrearReporteClose(): void {
    this.showCrearReporte.set(false);
    this.map.getContainer().style.cursor = '';
  }

  clearFilters(): void {
    this.filters = { estado: '', municipioId: '', tipoProblemaId: '' };
    this.loadReportes();
  }

  getTipoNombre(reporte: Reporte): string {
    return reporte.tipoProblema?.nombre ?? 'Problema de agua';
  }

  getMunicipioNombre(reporte: Reporte): string {
    return reporte.municipio?.nombre ?? '-';
  }
}
