const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

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

// Obtener todos los accesos
app.get("/api/accesos", (req, res) => {
    res.json(accesos);
});

// Registrar entrada
app.post("/api/accesos", (req, res) => {
    const { nombre, tipo, departamento, placas } = req.body;

    if (!nombre || !tipo || !departamento) {
        return res.status(400).json({
            error: "Nombre, tipo y departamento son obligatorios"
        });
    }

    const nuevoAcceso = {
        id: siguienteId++,
        nombre,
        tipo,
        departamento,
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

// Registrar salida
app.put("/api/accesos/:id/salida", (req, res) => {
    const id = parseInt(req.params.id);

    const acceso = accesos.find(a => a.id === id);

    if (!acceso) {
        return res.status(404).json({
            error: "Acceso no encontrado"
        });
    }

    if (acceso.salida) {
        return res.status(400).json({
            error: "La salida ya fue registrada"
        });
    }

    acceso.salida = new Date().toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
    });

    res.json(acceso);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});