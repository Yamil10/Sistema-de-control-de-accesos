const express = require("express");
const path = require("path");

const app = express();

// Render asigna automáticamente el puerto mediante process.env.PORT
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Datos temporales en memoria
let accesos = [
    {
        id: 1,
        nombre: "Juan Pérez",
        tipo: "Residente",
        departamento: "201",
        placas: "",
        entrada: "08:30",
        salida: null
    },
    {
        id: 2,
        nombre: "María López",
        tipo: "Familia",
        departamento: "304",
        placas: "ABC-123",
        entrada: "10:15",
        salida: null
    }
];

let siguienteId = 3;


// ==========================================
// OBTENER TODOS LOS ACCESOS
// ==========================================

app.get("/api/accesos", (req, res) => {
    res.json(accesos);
});


// ==========================================
// REGISTRAR ENTRADA
// ==========================================

app.post("/api/accesos", (req, res) => {

    const {
        nombre,
        tipo,
        departamento,
        placas
    } = req.body;

    // Validación
    if (!nombre || !tipo || !departamento) {

        return res.status(400).json({
            error: "Nombre, tipo y departamento son obligatorios."
        });
    }

    // Crear nuevo acceso
    const nuevoAcceso = {

        id: siguienteId++,

        nombre: nombre,

        tipo: tipo,

        departamento: departamento,

        placas: placas || "",

        entrada: new Date().toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit"
        }),

        salida: null
    };

    accesos.push(nuevoAcceso);

    res.status(201).json(nuevoAcceso);
});


// ==========================================
// REGISTRAR SALIDA
// ==========================================

app.put("/api/accesos/:id/salida", (req, res) => {

    const id = parseInt(req.params.id);

    const acceso = accesos.find(
        acceso => acceso.id === id
    );

    // Si no existe
    if (!acceso) {

        return res.status(404).json({
            error: "Acceso no encontrado."
        });
    }

    // Si ya tiene salida
    if (acceso.salida) {

        return res.status(400).json({
            error: "La salida ya fue registrada."
        });
    }

    // Registrar hora de salida
    acceso.salida = new Date().toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
    });

    res.json(acceso);
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