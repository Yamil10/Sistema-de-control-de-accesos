# Documentación de Pruebas — Sistema de Control de Accesos

Repositorio: https://github.com/Yamil10/Sistema-de-control-de-accesos

## Cómo correr las pruebas

```bash
npm install
npm test
```

Resultado: **18 pruebas, 18 aprobadas** (Jest + Supertest).

```
Test Suites: 1 passed, 1 total
Tests:       18 passed, 18 total
```

## Pruebas exitosas (10)

Cubren el flujo correcto del CRUD (respuestas 200/201).

| Endpoint | Prueba |
|----------|--------|
| GET /api/residentes | Obtener todos los residentes |
| GET /api/residentes/:id | Obtener un residente específico |
| POST /api/residentes | Crear un nuevo residente |
| PUT /api/residentes/:id | Actualizar un residente |
| DELETE /api/residentes/:id | Eliminar un residente |
| GET /api/visitas | Obtener la lista de visitas |
| POST /api/visitas | Registrar una nueva visita |
| GET /api/visitas/:id | Obtener una visita específica |
| PUT /api/visitas/:id | Actualizar una visita |
| DELETE /api/visitas/:id | Eliminar una visita |

## Pruebas de casos de error (8)

Validan que la API rechaza correctamente peticiones inválidas (respuestas 400/404).

| Endpoint | Prueba | Respuesta esperada |
|----------|--------|--------------------|
| GET /api/residentes/:id | Regresar 404 si no existe | 404 |
| POST /api/residentes | Rechazar campos vacíos | 400 |
| PUT /api/residentes/:id | Regresar 404 si no existe | 404 |
| DELETE /api/residentes/:id | Regresar 404 si no existe | 404 |
| POST /api/visitas | Rechazar campos obligatorios vacíos | 400 |
| POST /api/visitas | Rechazar residente que no pertenece al departamento | 400 |
| PUT /api/visitas/:id | Regresar 404 si no existe | 404 |
| DELETE /api/visitas/:id | Regresar 404 si no existe | 404 |