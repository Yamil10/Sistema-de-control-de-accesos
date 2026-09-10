const request = require("supertest");
const app = require("../server");


// ==========================================
// TESTS DE RESIDENTES
// ==========================================

describe("CRUD de Residentes", () => {

    // READ - Obtener todos los residentes
    test("GET /api/residentes - debe obtener todos los residentes", async () => {

        const response = await request(app)
            .get("/api/residentes");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

    });


    // READ - Obtener un residente
    test("GET /api/residentes/:id - debe obtener un residente específico", async () => {

        const response = await request(app)
            .get("/api/residentes/1");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", 1);
        expect(response.body).toHaveProperty("nombre");
        expect(response.body).toHaveProperty("departamento");

    });


    // READ - Residente inexistente
    test("GET /api/residentes/:id - debe regresar 404 si no existe", async () => {

        const response = await request(app)
            .get("/api/residentes/9999");

        expect(response.statusCode).toBe(404);

    });


    // CREATE - Registrar residente
    test("POST /api/residentes - debe crear un nuevo residente", async () => {

        const response = await request(app)
            .post("/api/residentes")
            .send({
                nombre: "Residente de Prueba",
                departamento: "101"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.nombre).toBe("Residente de Prueba");
        expect(response.body.departamento).toBe("101");

    });


    // CREATE - Validación
    test("POST /api/residentes - debe rechazar campos vacíos", async () => {

        const response = await request(app)
            .post("/api/residentes")
            .send({
                nombre: "",
                departamento: ""
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");

    });


    // UPDATE - Actualizar residente
    test("PUT /api/residentes/:id - debe actualizar un residente", async () => {

        const response = await request(app)
            .put("/api/residentes/1")
            .send({
                nombre: "Ana García Actualizada",
                departamento: "101"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.nombre).toBe("Ana García Actualizada");
        expect(response.body.departamento).toBe("101");

    });


    // UPDATE - Residente inexistente
    test("PUT /api/residentes/:id - debe regresar 404 si no existe", async () => {

        const response = await request(app)
            .put("/api/residentes/9999")
            .send({
                nombre: "No Existe",
                departamento: "101"
            });

        expect(response.statusCode).toBe(404);

    });


    // DELETE - Eliminar residente
    test("DELETE /api/residentes/:id - debe eliminar un residente", async () => {

        // Primero creamos uno para no eliminar datos originales
        const creado = await request(app)
            .post("/api/residentes")
            .send({
                nombre: "Residente Para Eliminar",
                departamento: "102"
            });

        const id = creado.body.id;

        const response = await request(app)
            .delete(`/api/residentes/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
            "mensaje",
            "Residente eliminado correctamente."
        );

    });


    // DELETE - Residente inexistente
    test("DELETE /api/residentes/:id - debe regresar 404 si no existe", async () => {

        const response = await request(app)
            .delete("/api/residentes/9999");

        expect(response.statusCode).toBe(404);

    });

});


// ==========================================
// TESTS DE VISITAS
// ==========================================

describe("CRUD de Visitas", () => {

    let visitaId;


    // READ - Obtener visitas
    test("GET /api/visitas - debe obtener la lista de visitas", async () => {

        const response = await request(app)
            .get("/api/visitas");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });


    // CREATE - Crear visita
    test("POST /api/visitas - debe registrar una nueva visita", async () => {

        const response = await request(app)
            .post("/api/visitas")
            .send({
                departamento: "101",
                residenteId: 1,
                visitante: "Visitante de Prueba",
                tipo: "Familiar"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.departamento).toBe("101");
        expect(response.body.residenteId).toBe(1);
        expect(response.body.visitante).toBe("Visitante de Prueba");
        expect(response.body.tipo).toBe("Familiar");
        expect(response.body).toHaveProperty("timestamp");

        visitaId = response.body.id;

    });


    // CREATE - Campos obligatorios
    test("POST /api/visitas - debe rechazar campos obligatorios vacíos", async () => {

        const response = await request(app)
            .post("/api/visitas")
            .send({
                departamento: "",
                residenteId: "",
                visitante: "",
                tipo: ""
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");

    });


    // CREATE - Validar departamento y residente
    test("POST /api/visitas - debe rechazar un residente que no pertenece al departamento", async () => {

        const response = await request(app)
            .post("/api/visitas")
            .send({
                departamento: "999",
                residenteId: 1,
                visitante: "Visitante Incorrecto",
                tipo: "Familiar"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");

    });


    // READ - Obtener visita específica
    test("GET /api/visitas/:id - debe obtener una visita específica", async () => {

        const response = await request(app)
            .get(`/api/visitas/${visitaId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", visitaId);
        expect(response.body).toHaveProperty("visitante");

    });


    // UPDATE - Actualizar visita
    test("PUT /api/visitas/:id - debe actualizar una visita", async () => {

        const response = await request(app)
            .put(`/api/visitas/${visitaId}`)
            .send({
                departamento: "101",
                residenteId: 1,
                visitante: "Visitante Actualizado",
                tipo: "Proveedor"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(visitaId);
        expect(response.body.visitante).toBe("Visitante Actualizado");
        expect(response.body.tipo).toBe("Proveedor");

    });


    // UPDATE - Visita inexistente
    test("PUT /api/visitas/:id - debe regresar 404 si no existe", async () => {

        const response = await request(app)
            .put("/api/visitas/9999")
            .send({
                departamento: "101",
                residenteId: 1,
                visitante: "No Existe",
                tipo: "Familiar"
            });

        expect(response.statusCode).toBe(404);

    });


    // DELETE - Eliminar visita
    test("DELETE /api/visitas/:id - debe eliminar una visita", async () => {

        const response = await request(app)
            .delete(`/api/visitas/${visitaId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
            "mensaje",
            "Visita eliminada correctamente."
        );

    });


    // DELETE - Visita inexistente
    test("DELETE /api/visitas/:id - debe regresar 404 si no existe", async () => {

        const response = await request(app)
            .delete("/api/visitas/9999");

        expect(response.statusCode).toBe(404);

    });

});