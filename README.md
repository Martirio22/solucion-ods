# AguaAlerta API REST

API REST con Node.js, Express, MongoDB y arquitectura hexagonal para reportar problemas de agua: fugas, contaminación, falta de acceso, agua sucia, etc.

## Instalación

```bash
npm install
```

## Configuración

Por defecto usa:

```txt
mongodb://127.0.0.1:27017/bd-agua-alerta
```

Opcionalmente crea un archivo `.env` o define variable de entorno:

```txt
PORT=3977
MONGO_URI=mongodb://127.0.0.1:27017/bd-agua-alerta
```

## Ejecutar

```bash
npm run dev
```

O:

```bash
npm start
```

## Datos iniciales opcionales

```bash
npm run seed
```

## Endpoints principales

### Municipios

```txt
POST   /api/municipios
GET    /api/municipios
GET    /api/municipios/:id
PUT    /api/municipios/:id
DELETE /api/municipios/:id
```

### Tipos de problema

```txt
POST   /api/tipos-problema
GET    /api/tipos-problema
GET    /api/tipos-problema/:id
PUT    /api/tipos-problema/:id
DELETE /api/tipos-problema/:id
```

### Usuarios

```txt
POST   /api/usuarios
GET    /api/usuarios
GET    /api/usuarios/:id
PUT    /api/usuarios/:id
DELETE /api/usuarios/:id
```

### Reportes

```txt
POST   /api/reportes
GET    /api/reportes
GET    /api/reportes/:id
PUT    /api/reportes/:id
DELETE /api/reportes/:id
POST   /api/reportes/:id/confirmar
POST   /api/reportes/:id/evidencias
POST   /api/reportes/:id/generar-oficio
PUT    /api/reportes/:id/cambiar-estado
GET    /api/reportes/:id/confirmaciones
GET    /api/reportes/:id/evidencias
GET    /api/reportes/:id/historial
GET    /api/reportes/:id/oficios
```

### Evidencias

```txt
GET    /api/evidencias
GET    /api/evidencias/:id
DELETE /api/evidencias/:id
```

### Confirmaciones

```txt
GET    /api/confirmaciones
GET    /api/confirmaciones/:id
DELETE /api/confirmaciones/:id
```

### Oficios

```txt
GET    /api/oficios
GET    /api/oficios/:id
PUT    /api/oficios/:id/marcar-enviado
DELETE /api/oficios/:id
```

### Historial de estados

```txt
GET    /api/historial-estados
GET    /api/historial-estados/:id
DELETE /api/historial-estados/:id
```

## Flujo recomendado

```txt
1. Crear municipio
2. Crear tipo de problema
3. Crear reporte
4. Agregar evidencia
5. Confirmar reporte varias veces
6. Al llegar al umbral, se escala automáticamente
7. Se genera oficio automáticamente
8. Se cambia estado a en_revision, resuelto o rechazado
```

Revisa `pruebas_insomnia_agua_alerta.txt` para consumir los endpoints desde Insomnia.
