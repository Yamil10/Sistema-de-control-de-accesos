# Sistema de Control de Accesos — Documentación técnica

> Sistema web para administrar y controlar el acceso de residentes y visitantes a un edificio.

- **Repositorio:** https://github.com/Yamil10/Sistema-de-control-de-accesos
- **Aplicación en producción:** https://sistema-de-control-de-accesos-equipo-7.onrender.com/
- **Última actualización del proyecto:** 2026

---

## 1. Descripción del proyecto

El **Sistema de Control de Accesos** es una aplicación web que permite registrar y consultar
el **ingreso de residentes y visitantes** a un edificio de departamentos.

La aplicación está compuesta por:

- Un **backend** en Node.js + Express que expone una **API REST** para administrar residentes y visitas.
- Un **frontend** en HTML, CSS y JavaScript (servido por Express) que permite usar el sistema desde el navegador.
- Una **suite de pruebas automatizadas** con Jest + Supertest que valida el correcto funcionamiento de la API.

El edificio cuenta con **5 pisos** y **4 departamentos por piso** (20 departamentos), numerados del `101` al `504`.

## 2. Funcionalidades principales

### 2.1 Registro de visitas
- Selección del departamento y del residente (el formulario carga automáticamente los residentes del departamento elegido).
- Captura del nombre del visitante y del tipo de visita.
- Captura automática de fecha y hora (formato `es-MX`, se actualiza cada segundo).
- Validación en cliente y en servidor.
- Al registrar una visita se valida que el visitante se atienda al departamento y residente correctos.

### 2.2 Registro de residentes
- Permite dar de alta a personas que se mudan a un departamento.
- Valida que nombre y departamento no estén vacíos.

### 2.3 Consulta de información
- Tabla con la lista de visitas registradas (visitante, departamento, residente, tipo, fecha y hora).
- Tabla con los residentes registrados.
- Los tipos de visita se muestran con **badges** de colores.

### 2.4 Tipos de acceso (visitante)
`Familia`, `Amigo`, `Proveedor` , `Taxi / Uber / Didi`, `Técnico`, `Repartidor` y `Otro`.

## 3. Stack tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Backend | Node.js | — |
| Framework HTTP | Express | `^5.1.0` |
| Frontend | HTML, CSS y JavaScript | — |
| Pruebas | Jest | `^30.5.1` |
| Pruebas HTTP | Supertest | `^7.2.2` |
| Gestor de dependencias | npm | — |

```json
{
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "jest": "^30.5.1",
    "supertest": "^7.2.2"
  }
}
```

## 4. Estructura del proyecto

```
Sistema-de-control-de-accesos/
├── public/                  # Frontend
│   ├── index.html           # Página principal
│   ├── style.css            # Estilos
│   └── app.js               # Lógica del frontend (fetch a la API)
├── tests/                   # Pruebas automatizadas
│   └── server.test.js       # 18 pruebas sobre la API (Jest + Supertest)
├── server.js                # Servidor Express y API REST
├── package.json             # Metadatos, dependencias y scripts
├── package-lock.json        # Versiones exactas de las dependencias
├── .gitignore
└── README.md                # Descripción general del proyecto
```

## 5. Requisitos previos

- **Node.js** (v18 o superior recomendado, compatible con Express 5) y **npm**.
- Para verificarlo:

```bash
node -v
npm -v
```

## 6. Instalación

```bash
npm install
```

Este comando instala todas las dependencias (producción y desarrollo) y genera/actualiza
el `package-lock.json`, garantizando que todos los integrantes usen **las mismas versiones
exactas** de cada dependencia.

> `node_modules` **no se sube al repositorio** (está en `.gitignore`). Cada quien lo
> genera localmente con `npm install`.

## 7. Ejecución

### 7.1 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor en el puerto `3000` (o el definido en `$PORT`) |
| `npm run dev` | Alias de desarrollo (misma ejecución que `npm start`) |
| `npm test` | Ejecuta la suite de pruebas con Jest (`jest --runInBand`) |

### 7.2 Ejecutar el servidor

```bash
npm start
```

Salida esperada:

```
Servidor funcionando en el puerto 3000
```

La aplicación queda disponible en: `http://localhost:3000`

El servidor escucha en el puerto definido por la variable de entorno `PORT`; si no existe,
usa el puerto `3000` (`server.js`, línea 6).

### 7.3 Usar la aplicación

- Abrir `http://localhost:3000` en un navegador.
- **Registrar una visita:** elegir departamento → residente → nombre del visitante → tipo → "Registrar".
- **Registrar un residente:** llenar nombre y departamento → "Registrar Residente".
- Las tablas de *Visitas* y *Residentes* se refrescan automáticamente.

---

## 8. API REST

Base URL local: `http://localhost:3000`
Formato de datos: **JSON** (`Content-Type: application/json`).

### 8.1 Convenciones

- Los parámetros de ruta `:id` son numéricos.
- Los cuerpos (`body`) de creación/actualización se envían como JSON.
- Códigos de respuesta utilizados:

| Código | Significado |
|--------|-------------|
| `200 OK` | Operación exitosa (lectura, actualización o eliminación) |
| `201 Created` | Recurso creado correctamente (POST) |
| `400 Bad Request` | Datos faltantes o inválidos en el cuerpo |
| `404 Not Found` | El recurso solicitado no existe |

### 8.2 Residentes

Se inicia con una **lista predefinida de 29 residentes** (puede crecer con la alta de nuevos residentes).
Estructura de un residente:

```json
{
  "id": 1,
  "nombre": "Ana García",
  "departamento": "101"
}
```

#### GET `/api/residentes`
Devuelve la lista completa de residentes.

```bash
curl http://localhost:3000/api/residentes
```

**Respuesta `200 OK`:**
```json
[
  { "id": 1, "nombre": "Ana García", "departamento": "101" },
  { "id": 2, "nombre": "Carlos García", "departamento": "101" }
]
```

#### GET `/api/residentes/:id`
Devuelve un residente por su `id`.

```bash
curl http://localhost:3000/api/residentes/1
```

**Respuesta `200 OK`:**
```json
{ "id": 1, "nombre": "Ana García", "departamento": "101" }
```

**Respuesta `404 Not Found`** (si el id no existe):
```json
{ "error": "Residente no encontrado." }
```

#### POST `/api/residentes`
Crea un nuevo residente.

```bash
curl -X POST http://localhost:3000/api/residentes \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Laura Flores", "departamento": "102"}'
```

**Respuesta `201 Created`:**
```json
{ "id": 30, "nombre": "Laura Flores", "departamento": "102" }
```

**Respuesta `400 Bad Request`** (nombre o departamento faltantes):
```json
{ "error": "Nombre y departamento son obligatorios." }
```

#### PUT `/api/residentes/:id`
Actualiza el nombre y departamento de un residente existente.

```bash
curl -X PUT http://localhost:3000/api/residentes/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Ana García Actualizada", "departamento": "101"}'
```

**Respuesta `200 OK`:**
```json
{ "id": 1, "nombre": "Ana García Actualizada", "departamento": "101" }
```

**Errores:** `400` (campos vacíos) o `404` (residente inexistente).

#### DELETE `/api/residentes/:id`
Elimina un residente existente.

```bash
curl -X DELETE http://localhost:3000/api/residentes/1
```

**Respuesta `200 OK`:**
```json
{
  "mensaje": "Residente eliminado correctamente.",
  "residente": { "id": 1, "nombre": "Ana García Actualizada", "departamento": "101" }
}
```

**Respuesta `404 Not Found`**: `{ "error": "Residente no encontrado." }`

### 8.3 Visitas

Se inicia con la lista **vacía**. Estructura de una visita:

```json
{
  "id": 1,
  "departamento": "101",
  "residenteId": 1,
  "residente": "Ana García",
  "visitante": "Pedro Soto",
  "tipo": "Proveedor",
  "timestamp": "10/09/26, 15:40"
}
```

> La visita **guarda el nombre del residente** al momento del registro (`residente`) y una
> marca de fecha/hora local (`timestamp`) en formato `es-MX`.

#### GET `/api/visitas`
Devuelve la lista de visitas registradas. **Respuesta `200 OK`:** array de visitas.

```bash
curl http://localhost:3000/api/visitas
```

#### GET `/api/visitas/:id`
Devuelve una visita por su `id`. Respuestas: `200` o `404` (`{ "error": "Visita no encontrada." }`).

#### POST `/api/visitas`
Registra una nueva visita. **Validaciones del servidor:**

1. Todos los campos son obligatorios (`departamento`, `residenteId`, `visitante`, `tipo`).
2. El `residenteId` debe corresponder a un residente que **pertenezca al `departamento`** indicado.

```bash
curl -X POST http://localhost:3000/api/visitas \
  -H "Content-Type: application/json" \
  -d '{
    "departamento": "101",
    "residenteId": 1,
    "visitante": "Pedro Soto",
    "tipo": "Proveedor"
  }'
```

**Respuesta `201 Created`:**
```json
{
  "id": 1,
  "departamento": "101",
  "residenteId": 1,
  "residente": "Ana García",
  "visitante": "Pedro Soto",
  "tipo": "Proveedor",
  "timestamp": "10/09/26, 15:40"
}
```

**Respuesta `400 Bad Request`** (campos faltantes):
```json
{ "error": "Todos los campos son obligatorios." }
```

**Respuesta `400 Bad Request`** (el residente no pertenece al departamento):
```json
{ "error": "El residente no pertenece al departamento seleccionado." }
```

#### PUT `/api/visitas/:id`
Actualiza una visita existente. Respuestas: `200`, `400` (validaciones) o `404`.

#### DELETE `/api/visitas/:id`
Elimina una visita. **Respuesta `200 OK`:**
```json
{ "mensaje": "Visita eliminada correctamente.", "visita": { ... } }
```
**Respuesta `404`:** `{ "error": "Visita no encontrada." }`

### 8.4 Resumen de endpoints

| Método | Ruta | Descripción | Éxito | Errores |
|--------|------|-------------|-------|---------|
| GET | `/api/residentes` | Listar residentes | 200 | — |
| GET | `/api/residentes/:id` | Obtener residente | 200 | 404 |
| POST | `/api/residentes` | Crear residente | 201 | 400 |
| PUT | `/api/residentes/:id` | Actualizar residente | 200 | 400, 404 |
| DELETE | `/api/residentes/:id` | Eliminar residente | 200 | 404 |
| GET | `/api/visitas` | Listar visitas | 200 | — |
| GET | `/api/visitas/:id` | Obtener visita | 200 | 404 |
| POST | `/api/visitas` | Registrar visita | 201 | 400 |
| PUT | `/api/visitas/:id` | Actualizar visita | 200 | 400, 404 |
| DELETE | `/api/visitas/:id` | Eliminar visita | 200 | 404 |

---

## 9. Pruebas automatizadas

### 9.1 Tecnología y configuración

- **Jest** como framework de pruebas y **Supertest** para hacer peticiones HTTP reales contra la aplicación.
- `server.js` exporta la aplicación (`module.exports = app`) para que Supertest la pueda usar
  **sin necesidad de levantar un puerto real**.
- Script definido en `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js",
  "test": "jest --runInBand"
}
```

`--runInBand` ejecuta las pruebas de forma **secuencial**, en el mismo proceso. Esto es
importante porque las pruebas comparten el estado en memoria del servidor.

> **Importante:** el archivo de pruebas es **independiente del frontend** y no requiere
> navegador ni pantalla; valida únicamente la capa de API.

### 9.2 Cómo ejecutarlas

```bash
npm test
```

Resultado esperado (todo en verde):

```
Test Suites: 1 passed, 1 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        0.7 s
Ran all test suites.
```

### 9.3 Estructura de la suite

El archivo `tests/server.test.js` organiza las pruebas en **dos bloques (`describe`)**:

- `describe("CRUD de Residentes")` → **9 pruebas**
- `describe("CRUD de Visitas")` → **9 pruebas**

Cada bloque cubre las 5 operaciones CRUD: **listar, obtener, crear, actualizar y eliminar**.

### 9.4 Pruebas exitosas (escenarios de éxito)

Son las pruebas que **validan el comportamiento correcto** del sistema (respuestas `2xx`
y datos correctos). Representan **10 de las 18 pruebas** y confirman que las operaciones
del CRUD funcionan como se espera.

#### CRUD de Residentes (pruebas exitosas)

| # | Nombre de la prueba | Operación | Respuesta esperada | Qué valida |
|---|---------------------|-----------|--------------------|------------|
| 1 | `GET /api/residentes - debe obtener todos los residentes` | GET lista | `200` | Que devuelve un arreglo y que contiene al menos un residente |
| 2 | `GET /api/residentes/:id - debe obtener un residente específico` | GET por id | `200` | Que el residente `1` existe y tiene los campos `id`, `nombre` y `departamento` |
| 3 | `POST /api/residentes - debe crear un nuevo residente` | POST | `201` | Que se asigna un `id`, y se guardan `nombre` y `departamento` correctamente |
| 4 | `PUT /api/residentes/:id - debe actualizar un residente` | PUT | `200` | Que el residente `1` queda con el nuevo nombre y el departamento correctos |
| 5 | `DELETE /api/residentes/:id - debe eliminar un residente` | DELETE | `200` | Crea un residente, lo elimina y confirma el mensaje de éxito |

#### CRUD de Visitas (pruebas exitosas)

| # | Nombre de la prueba | Operación | Respuesta esperada | Qué valida |
|---|---------------------|-----------|--------------------|------------|
| 6 | `GET /api/visitas - debe obtener la lista de visitas` | GET lista | `200` | Que devuelve un arreglo |
| 7 | `POST /api/visitas - debe registrar una nueva visita` | POST | `201` | Que asigna `id`, guarda los datos y genera el `timestamp` |
| 8 | `GET /api/visitas/:id - debe obtener una visita específica` | GET por id | `200` | Que la visita creada se recupera con los datos correctos |
| 9 | `PUT /api/visitas/:id - debe actualizar una visita` | PUT | `200` | Que se actualizan correctamente `visitante` y `tipo` |
| 10 | `DELETE /api/visitas/:id - debe eliminar una visita` | DELETE | `200` | Que la visita se elimina y confirma el mensaje de éxito |

### 9.5 Pruebas de casos fallidos (validación de errores)

Son las pruebas que **validan los escenarios de error** del sistema (respuestas `4xx`).
Representan **8 de las 18 pruebas**. Aunque se les llama "casos fallidos" (porque la
operación del usuario falla), **la prueba en sí pasa** porque confirma que la API rechaza
correctamente las peticiones inválidas. Es decir: **se espera que falle la operación,
no la prueba**.

#### CRUD de Residentes (casos de error)

| # | Nombre de la prueba | Escenario | Respuesta esperada | Por qué ocurre |
|---|---------------------|-----------|--------------------|----------------|
| 11 | `GET /api/residentes/:id - debe regresar 404 si no existe` | Consultar un id inexistente (`9999`) | `404` | No hay residente con ese id; la API responde `{ "error": "Residente no encontrado." }` |
| 12 | `POST /api/residentes - debe rechazar campos vacíos` | Enviar `nombre` y `departamento` vacíos | `400` | El servidor valida campos obligatorios y responde `{ "error": "Nombre y departamento son obligatorios." }` |
| 13 | `PUT /api/residentes/:id - debe regresar 404 si no existe` | Actualizar un id inexistente (`9999`) | `404` | La API no encuentra el residente a actualizar |
| 14 | `DELETE /api/residentes/:id - debe regresar 404 si no existe` | Eliminar un id inexistente (`9999`) | `404` | No hay residente que eliminar |

#### CRUD de Visitas (casos de error)

| # | Nombre de la prueba | Escenario | Respuesta esperada | Por qué ocurre |
|---|---------------------|-----------|--------------------|----------------|
| 15 | `POST /api/visitas - debe rechazar campos obligatorios vacíos` | Enviar todos los campos vacíos | `400` | La API responde `{ "error": "Todos los campos son obligatorios." }` |
| 16 | `POST /api/visitas - debe rechazar un residente que no pertenece al departamento` | Enviar `departamento: "999"` con `residenteId: 1` | `400` | El residente no pertenece al departamento; la API responde `{ "error": "El residente no pertenece al departamento seleccionado." }` |
| 17 | `PUT /api/visitas/:id - debe regresar 404 si no existe` | Actualizar un id inexistente (`9999`) | `404` | No hay visita que actualizar |
| 18 | `DELETE /api/visitas/:id - debe regresar 404 si no existe` | Eliminar un id inexistente (`9999`) | `404` | No hay visita que eliminar |

### 9.6 Resumen de la cobertura

| Categoría | Residentes | Visitas | Total |
|-----------|-----------|---------|-------|
| Casos de éxito (2xx) | 5 | 5 | **10** |
| Casos de error (4xx) | 4 | 4 | **8** |
| **Total** | **9** | **9** | **18** |

### 9.7 Ejecutar una prueba específica

```bash
npx jest -t "debe crear un nuevo residente"
```

```bash
npx jest tests/server.test.js -t "CRUD de Visitas"
```

---

## 10. Comandos útiles

| Comando | Qué hace |
|---------|----------|
| `npm install` | Instala dependencias del proyecto |
| `npm start` | Levanta el servidor |
| `npm test` | Corre las 18 pruebas |
| `npx jest -t "<nombre>"` | Corre una prueba o grupo específico |

## 11. Despliegue (Render)

La aplicación está desplegada en **Render**. Para ello:

1. El repo se conecta a un servicio *Web Service* en Render.
2. `npm install` se ejecuta automáticamente al hacer build.
3. El comando de inicio debe ser `npm start`.
4. Render inyecta la variable de entorno `PORT`, que el servidor respeta
   (`const PORT = process.env.PORT || 3000`).

URL de producción: https://sistema-de-control-de-accesos-equipo-7.onrender.com/

## 12. Limitaciones y notas

- **Persistencia en memoria:** los datos se guardan en arreglos dentro de `server.js`; al
  reiniciar el servidor o desplegar de nuevo, **toda la información se reinicia**.
- **Pruebas con estado compartido:** las pruebas comparten el estado en memoria y dependen
  del **orden de ejecución** (por eso se usa `--runInBand`). Por ejemplo, la prueba de
  "eliminar visita" reutiliza una visita creada en una prueba anterior.
- **Dependencias versionadas:** `package-lock.json` permite reproducir versiones exactas y
  `node_modules` está excluido del repositorio vía `.gitignore`.
- **Zona horaria / idioma:** las fechas se generan con `toLocaleString("es-MX", ...)` según
  la configuración zona del servidor o de la máquina local.

## 13. API de la aplicación (frontend → backend)

El frontend (`public/app.js`) consume la API mediante `fetch` y sirve como referencia de uso:

| Frontend | Endpoint | Método |
|----------|----------|--------|
| Cargar residentes al elegir departamento | `/api/residentes` | GET |
| Registrar visita | `/api/visitas` | POST |
| Registrar residente | `/api/residentes` | POST |
| Mostrar tabla de visitas | `/api/visitas` | GET |
| Mostrar tabla de residentes | `/api/residentes` | GET |