const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ==========================================
// RESIDENTES DEL EDIFICIO
// 5 pisos - 4 departamentos por piso
// ==========================================

const residentes = [
    // Piso 1
    {
        id: 1,
        nombre: "Ana García",
        departamento: "101"
    },
    {
        id: 2,
        nombre: "Carlos Martínez",
        departamento: "102"
    },
    {
        id: 3,
        nombre: "Laura Rodríguez",
        departamento: "103"
    },
    {
        id: 4,
        nombre: "Miguel Hernández",
        departamento: "104"
    },

    // Piso 2
    {
        id: 5,
        nombre: "Sofía López",
        departamento: "201"
    },
    {
        id: 6,
        nombre: "Daniel González",
        departamento: "202"
    },
    {
        id: 7,
        nombre: "Valeria Pérez",
        departamento: "203"
    },
    {
        id: 8,
        nombre: "Fernando Sánchez",
        departamento: "204"
    },

    // Piso 3
    {
        id: 9,
        nombre: "Mariana Ramírez",
        departamento: "301"
    },
    {
        id: 10,
        nombre: "Jorge Torres",
        departamento: "302"
    },
    {
        id: 11,
        nombre: "Camila Flores",
        departamento: "303"
    },
    {
        id: 12,
        nombre: "Alejandro Rivera",
        departamento: "304"
    },

    // Piso 4
    {
        id: 13,
        nombre: "Gabriela Morales",
        departamento: "401"
    },
    {
        id: 14,
        nombre: "Luis Castillo",
        departamento: "402"
    },
    {
        id: 15,
        nombre: "Natalia Ortiz",
        departamento: "403"
    },
    {
        id: 16,
        nombre: "Ricardo Mendoza",
        departamento: "404"
    },

    // Piso 5
    {
        id: 17,
        nombre: "Andrea Vargas",
        departamento: "501"
    },
    {
        id: 18,
        nombre: "Roberto Jiménez",
        departamento: "502"
    },
    {
        id: 19,
        nombre: "Elena Cruz",
        departamento: "503"
    },
    {
        id: 20,
        nombre: "Diego Navarro",
        departamento: "504"
    }
];


// ==========================================
// ACCESOS
// ==========================================

let accesos = [
    {
        id: 1,
        nombre: "Ana García",
        tipo: "Residente",
        departamento: "101",
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
// OBTENER RESIDENTES
// ==========================================

app.get("/api/residentes", (req, res) => {
    res.json(residentes);
});


// ==========================================
// OBTENER ACCESOS
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

    if (!nombre || !tipo || !departamento) {
        return res.status(400).json({
            error: "Nombre, tipo y departamento son obligatorios."
        });
    }

    // Si es residente, verificar que exista en la lista
    if (tipo === "Residente") {

        const residente = residentes.find(
            r => r.nombre === nombre &&
                 r.departamento === departamento
        );

        if (!residente) {
            return res.status(400).json({
                error: "El residente seleccionado no es válido."
            });
        }
    }

    // Verificar si la persona ya está dentro
    const accesoActivo = accesos.find(
        acceso =>
            acceso.nombre === nombre &&
            acceso.salida === null
    );

    if (accesoActivo) {
        return res.status(400).json({
            error: "Esta persona ya se encuentra dentro del edificio."
        });
    }

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

    if (!acceso) {
        return res.status(404).json({
            error: "Acceso no encontrado."
        });
    }

    if (acceso.salida) {
        return res.status(400).json({
            error: "La salida ya fue registrada."
        });
    }

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