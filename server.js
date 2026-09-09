const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// ==========================================
// RESIDENTES
// ==========================================

let residentes = [
    // Piso 1
    { id: 1, nombre: "Ana García", departamento: "101" },
    { id: 2, nombre: "Carlos García", departamento: "101" },

    { id: 3, nombre: "Carlos Martínez", departamento: "102" },

    { id: 4, nombre: "Laura Rodríguez", departamento: "103" },
    { id: 5, nombre: "Diego Rodríguez", departamento: "103" },

    { id: 6, nombre: "Miguel Hernández", departamento: "104" },

    // Piso 2
    { id: 7, nombre: "Sofía López", departamento: "201" },
    { id: 8, nombre: "Daniel López", departamento: "201" },

    { id: 9, nombre: "Daniel González", departamento: "202" },

    { id: 10, nombre: "Valeria Pérez", departamento: "203" },
    { id: 11, nombre: "Carlos Pérez", departamento: "203" },
    { id: 12, nombre: "Sofía Pérez", departamento: "203" },

    { id: 13, nombre: "Fernando Sánchez", departamento: "204" },

    // Piso 3
    { id: 14, nombre: "Mariana Ramírez", departamento: "301" },

    { id: 15, nombre: "Jorge Torres", departamento: "302" },

    { id: 16, nombre: "Camila Flores", departamento: "303" },
    { id: 17, nombre: "Luis Flores", departamento: "303" },

    { id: 18, nombre: "Alejandro Rivera", departamento: "304" },

    // Piso 4
    { id: 19, nombre: "Gabriela Morales", departamento: "401" },
    { id: 20, nombre: "Luis Morales", departamento: "401" },

    { id: 21, nombre: "Luis Castillo", departamento: "402" },

    { id: 22, nombre: "Natalia Ortiz", departamento: "403" },

    { id: 23, nombre: "Ricardo Mendoza", departamento: "404" },

    // Piso 5
    { id: 24, nombre: "Andrea Vargas", departamento: "501" },
    { id: 25, nombre: "Roberto Vargas", departamento: "501" },

    { id: 26, nombre: "Roberto Jiménez", departamento: "502" },

    { id: 27, nombre: "Elena Cruz", departamento: "503" },
    { id: 28, nombre: "Mario Cruz", departamento: "503" },

    { id: 29, nombre: "Diego Navarro", departamento: "504" }
];


// ==========================================
// VISITAS
// ==========================================

let visitas = [];

let siguienteVisitaId = 1;

let siguienteResidenteId = 30;


// ==========================================
// OBTENER RESIDENTES
// ==========================================

app.get("/api/residentes", (req, res) => {
    res.json(residentes);
});


// ==========================================
// REGISTRAR NUEVO RESIDENTE
// ==========================================

app.post("/api/residentes", (req, res) => {

    const { nombre, departamento } = req.body;

    if (!nombre || !departamento) {
        return res.status(400).json({
            error: "Nombre y departamento son obligatorios."
        });
    }

    const nuevoResidente = {
        id: siguienteResidenteId++,
        nombre: nombre.trim(),
        departamento
    };

    residentes.push(nuevoResidente);

    res.status(201).json(nuevoResidente);
});


// ==========================================
// OBTENER VISITAS
// ==========================================

app.get("/api/visitas", (req, res) => {
    res.json(visitas);
});


// ==========================================
// REGISTRAR VISITA
// ==========================================

app.post("/api/visitas", (req, res) => {

    const {
        departamento,
        residenteId,
        visitante,
        tipo
    } = req.body;

    if (
        !departamento ||
        !residenteId ||
        !visitante ||
        !tipo
    ) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios."
        });
    }

    const residente = residentes.find(
        r =>
            r.id === Number(residenteId) &&
            r.departamento === departamento
    );

    if (!residente) {
        return res.status(400).json({
            error: "El residente no pertenece al departamento seleccionado."
        });
    }

    const nuevaVisita = {

        id: siguienteVisitaId++,

        departamento,

        residenteId: residente.id,

        residente: residente.nombre,

        visitante: visitante.trim(),

        tipo,

        timestamp: new Date().toLocaleString("es-MX", {
            dateStyle: "short",
            timeStyle: "short"
        })

    };

    visitas.push(nuevaVisita);

    res.status(201).json(nuevaVisita);
});


// ==========================================
// PÁGINA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});


// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Servidor funcionando en el puerto ${PORT}`
    );

});