# Sistema de Control de Accesos

Sistema web para administrar y controlar el acceso de residentes y visitantes a un edificio.

Repositorio: https://github.com/Yamil10/Sistema-de-control-de-accesos

Aplicación web: https://sistema-de-control-de-accesos-equipo-7.onrender.com/

## Descripción del proyecto

El Sistema de Control de Accesos fue desarrollado como una aplicación web utilizando Node.js, Express, HTML, CSS y JavaScript.

El objetivo principal es proporcionar una herramienta sencilla para llevar un registro de las personas que ingresan y salen de un edificio.

El edificio cuenta con 5 pisos y 4 departamentos por piso, para un total de 20 departamentos.

El sistema permite registrar tanto residentes como visitantes, además de consultar las personas que actualmente se encuentran dentro del edificio y revisar el historial de accesos.

## Distribución del edificio

| Piso | Departamentos |
|------|---------------|
| Piso 1 | 101, 102, 103, 104 |
| Piso 2 | 201, 202, 203, 204 |
| Piso 3 | 301, 302, 303, 304 |
| Piso 4 | 401, 402, 403, 404 |
| Piso 5 | 501, 502, 503, 504 |

## Residentes

El sistema cuenta con una lista predefinida de 20 residentes, uno por cada departamento.

| Departamento | Residente |
|--------------|-----------|
| 101 | Ana García |
| 102 | Carlos Martínez |
| 103 | Laura Rodríguez |
| 104 | Miguel Hernández |
| 201 | Sofía López |
| 202 | Daniel González |
| 203 | Valeria Pérez |
| 204 | Fernando Sánchez |
| 301 | Mariana Ramírez |
| 302 | Jorge Torres |
| 303 | Camila Flores |
| 304 | Alejandro Rivera |
| 401 | Gabriela Morales |
| 402 | Luis Castillo |
| 403 | Natalia Ortiz |
| 404 | Ricardo Mendoza |
| 501 | Andrea Vargas |
| 502 | Roberto Jiménez |
| 503 | Elena Cruz |
| 504 | Diego Navarro |

## Tipos de acceso

El sistema contempla los siguientes tipos de acceso:

- Residente
- Familia
- Proveedor
- Taxi / Uber / Didi
- Técnico
- Repartidor
- Otro

## Funcionalidades

### Registro de residentes

Los residentes se seleccionan desde una lista predefinida.

Al seleccionar un residente, el sistema identifica automáticamente el departamento correspondiente.

Por ejemplo, al seleccionar:

```text
Ana García - Depto. 101
