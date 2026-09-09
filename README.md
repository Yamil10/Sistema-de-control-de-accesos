# Sistema de Control de Accesos

Sistema web para administrar y controlar el acceso de residentes y visitantes a un edificio.

Repositorio: https://github.com/Yamil10/Sistema-de-control-de-accesos

## Descripción del proyecto

El Sistema de Control de Accesos fue desarrollado como una aplicación web utilizando Node.js, Express, HTML, CSS y JavaScript.

El objetivo principal es proporcionar una herramienta sencilla para llevar un registro de las personas que ingresan y salen de un edificio.

El sistema contempla diferentes tipos de acceso:

* Residentes
* Familiares
* Proveedores
* Taxi / Uber / Didi
* Técnicos
* Repartidores
* Otros visitantes

## Funcionalidades

### Registro de entradas

Permite registrar una nueva persona que ingresa al edificio mediante:

* Nombre
* Tipo de visitante
* Departamento
* Placas del vehículo (opcional)

El sistema registra automáticamente la hora de entrada.

### Registro de salidas

Permite registrar la salida de una persona que se encuentra actualmente dentro del edificio.

La hora de salida se registra automáticamente.

### Personas dentro del edificio

El sistema muestra una lista de las personas que actualmente se encuentran dentro del edificio.

### Historial de accesos

Permite consultar los registros de entrada y salida realizados durante la ejecución del sistema.

### Filtros

Los accesos pueden clasificarse según el tipo de visitante:

* Residente
* Familia
* Proveedor
* Taxi / Uber / Didi
* Técnico
* Repartidor
* Otro

### Estadísticas

El sistema muestra información general sobre los accesos registrados, como el número de personas dentro y la cantidad de accesos registrados.

## Tecnologías utilizadas

| Tecnología | Uso                                    |
| ---------- | -------------------------------------- |
| Node.js    | Entorno de ejecución del servidor      |
| Express    | Framework para crear el servidor y API |
| HTML5      | Estructura de la página web            |
| CSS3       | Diseño y estilos                       |
| JavaScript | Lógica e interacción de la aplicación  |
| Git        | Control de versiones                   |
| GitHub     | Repositorio y colaboración             |

## Estructura del proyecto

```text
control-accesos/
│
├── package.json
├── server.js
├── README.md
│
└── public/
    ├── index.html
    ├── style.css
    └── app.js
```

### server.js

Contiene el servidor de Node.js y Express, además de los endpoints utilizados por la aplicación.

### package.json

Contiene la información del proyecto y las dependencias necesarias para ejecutar la aplicación.

### index.html

Contiene la estructura principal de la página web.

### style.css

Contiene los estilos y diseño visual de la aplicación.

### app.js

Contiene la lógica del lado del cliente y la comunicación con la API.

### README.md

Contiene la documentación del proyecto, instrucciones de instalación y descripción de las funcionalidades.

## API

La aplicación utiliza una API REST sencilla.

### Obtener accesos

```http
GET /api/accesos
```

Obtiene todos los accesos registrados.

### Registrar entrada

```http
POST /api/accesos
```

Registra una nueva entrada.

Ejemplo:

```json
{
  "nombre": "Juan Pérez",
  "tipo": "Residente",
  "departamento": "201",
  "placas": "ABC-123"
}
```

### Registrar salida

```http
PUT /api/accesos/:id/salida
```

Registra la hora de salida de una persona.

Ejemplo:

```text
PUT /api/accesos/1/salida
```

## Instalación

### Requisitos

Para ejecutar el proyecto localmente se necesita:

* Node.js
* npm
* Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/Yamil10/Sistema-de-control-de-accesos.git
```

### 2. Entrar al proyecto

```bash
cd Sistema-de-control-de-accesos
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar el servidor

```bash
npm start
```

### 5. Abrir la aplicación

En el navegador:

```text
http://localhost:3000
```

## Despliegue

La aplicación puede desplegarse utilizando un servicio de hosting compatible con Node.js.

Una vez desplegada, se genera una dirección web pública que permite acceder al sistema desde cualquier computadora con conexión a Internet.

Link de la aplicación:

```
https://sistema-de-control-de-accesos-equipo-7.onrender.com/
```

El usuario solamente necesita abrir el enlace en su navegador.

## Almacenamiento de datos

Para mantener el proyecto sencillo, los datos se almacenan temporalmente en memoria mediante estructuras de JavaScript.

Esto significa que los registros se mantienen mientras el servidor está ejecutándose.

Al reiniciar el servidor, los datos temporales se pierden.

Para una versión futura se podría implementar una base de datos como:

* MySQL
* PostgreSQL
* MongoDB

## Validaciones

El sistema incluye validaciones básicas para evitar registros incompletos.

Los siguientes campos son obligatorios:

* Nombre
* Tipo de acceso
* Departamento

Las placas son opcionales.

También se valida que una salida no pueda registrarse nuevamente para el mismo acceso.

## Control de versiones

El proyecto utiliza Git y GitHub para controlar las versiones y permitir el trabajo colaborativo entre los desarrolladores.

El trabajo se dividió en diferentes ramas para evitar conflictos.

### Ramas principales

```text
main
backend
frontend
features
```

### Ejemplos de commits

```text
feat: create backend access control API
```

```text
feat: create access control web interface
```

```text
feat: add access filters and statistics
```

```text
docs: add project documentation
```

## Distribución del trabajo

### Developer 1 - Yamil Ramirez

Responsabilidades:

* Configuración de Node.js
* Configuración de Express
* Creación de la API
* Registro de entradas
* Registro de salidas
* Manejo de los datos

Archivos principales:

```text
server.js
package.json
```

### Developer 2 - Isabella Vazquez

Responsabilidades:

* Diseño de la página
* Formulario de registro
* Tabla de accesos
* Botones de interacción
* Estilos visuales
* Comunicación con la API

Archivos principales:

```text
public/index.html
public/style.css
public/app.js
```

### Developer 3 - Areli Perdue

Responsabilidades:

* Filtros por tipo de visitante
* Estadísticas de accesos
* Historial
* Validaciones adicionales
* Documentación del proyecto
* Pruebas de funcionamiento

Archivo principal:

```text
README.md
```

## Flujo de funcionamiento

```text
Usuario
   |
   v
Página Web
   |
   v
Formulario de acceso
   |
   v
JavaScript
   |
   v
API REST
   |
   v
Node.js + Express
   |
   v
Registro del acceso
   |
   v
Actualización de la página
```

## Mejoras futuras

Para una versión futura del sistema se podrían implementar:

* Base de datos permanente.
* Sistema de inicio de sesión.
* Roles para administradores y guardias.
* Registro de residentes.
* Autorización previa de visitantes.
* Código QR para visitantes.
* Registro de fotografía.
* Notificaciones al residente.
* Reportes de accesos.
* Exportación de información a Excel o PDF.
* Panel administrativo.
* Registro permanente de vehículos.

## Estado del proyecto

Versión: 1.0

Estado: MVP funcional

El proyecto implementa las funciones básicas necesarias para registrar y consultar los accesos de un edificio.

## Equipo

Sistema de Control de Accesos

Proyecto desarrollado utilizando Node.js y tecnologías web.

Integrantes:

* Yamil Ramirez
* Isabella Vazquez
* Areli Perdue
