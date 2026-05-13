import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ciudadano/mapa/mapa.component').then(m => m.MapaComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'reportes',
        loadComponent: () => import('./admin/reportes/reportes.component').then(m => m.ReportesComponent),
      },
      {
        path: 'reportes/:id',
        loadComponent: () =>
          import('./admin/detalle-reporte/detalle-reporte-admin.component').then(m => m.DetalleReporteAdminComponent),
      },
      {
        path: 'municipios',
        loadComponent: () => import('./admin/municipios/municipios.component').then(m => m.MunicipiosComponent),
      },
      {
        path: 'tipos-problema',
        loadComponent: () =>
          import('./admin/tipos-problema/tipos-problema.component').then(m => m.TiposProblemaComponent),
      },
      {
        path: 'oficios',
        loadComponent: () => import('./admin/oficios/oficios.component').then(m => m.OficiosComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
