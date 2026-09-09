const API = "/api/accesos";

const TIPOS = [
    "Residente",
    "Familia",
    "Proveedor",
    "Taxi / Uber / Didi",
    "Técnico",
    "Repartidor",
    "Otro"
];

const TIPO_CLASES = {
    "Residente": "Residente",
    "Familia": "Familia",
    "Proveedor": "Proveedor",
    "Taxi / Uber / Didi": "Taxi",
    "Técnico": "Técnico",
    "Repartidor": "Repartidor",
    "Otro": "Otro"
};

let accesos = [];
let filtroActual = "";

const $ = (id) => document.getElementById(id);

const formEntrada = $("formEntrada");
const filtroTipo = $("filtroTipo");
const dentroLista = $("dentroLista");
const historialTabla = $("historialTabla");

const esc = (valor = "") =>
    String(valor).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[c]));

const iniciales = (nombre = "") =>
    nombre
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase() || "?";

function mostrarMensaje(texto, tipo) {
    const msg = $("mensaje");
    msg.textContent = texto;
    msg.className = "mensaje " + tipo;
    clearTimeout(mostrarMensaje._t);
    mostrarMensaje._t = setTimeout(() => {
        msg.className = "mensaje";
    }, 3500);
}

async function cargarAccesos() {
    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("No se pudo obtener la información.");
        accesos = await res.json();
        renderTodos();
    } catch (err) {
        dentroLista.innerHTML = `<p class="vacio">${esc(err.message)}</p>`;
        historialTabla.innerHTML = "";
    }
}

function renderTodos() {
    renderStats();
    renderDentro();
    renderHistorial();
}

function renderStats() {
    const dentro = accesos.filter((a) => !a.salida).length;
    const salidas = accesos.filter((a) => a.salida).length;
    const vehiculos = accesos.filter((a) => a.placas && a.placas.trim() !== "").length;

    $("statDentro").textContent = dentro;
    $("statTotal").textContent = accesos.length;
    $("statSalidas").textContent = salidas;
    $("statVehiculos").textContent = vehiculos;
}

function renderDentro() {
    const dentro = accesos.filter((a) => !a.salida);

    if (dentro.length === 0) {
        dentroLista.innerHTML = `<p class="vacio">No hay personas dentro del edificio.</p>`;
        return;
    }

    dentroLista.innerHTML = dentro
        .map((a) => `
            <div class="persona-item">
                <span class="avatar">${esc(iniciales(a.nombre))}</span>
                <div class="persona-info">
                    <div class="nombre">${esc(a.nombre)}</div>
                    <div class="meta">
                        <span class="badge badge-${esc(tipoClase(a.tipo))}">${esc(a.tipo)}</span>
                        <span>• Depto ${esc(a.departamento)}</span>
                        <span>• ${esc(a.entrada)}</span>
                    </div>
                </div>
                <button class="btn btn-salida" data-id="${a.id}" title="Registrar salida">
                    Salida
                </button>
            </div>
        `)
        .join("");
}

function renderHistorial() {
    const filtrados = filtroActual
        ? accesos.filter((a) => a.tipo === filtroActual)
        : accesos;

    if (filtrados.length === 0) {
        historialTabla.innerHTML = `<p class="vacio">No hay accesos registrados${filtroActual ? ` de tipo “${esc(filtroActual)}”` : ""}.</p>`;
        return;
    }

    const filas = [...filtrados].reverse().map((a) => {
        const estado = a.salida
            ? `<span class="estado fuera"><span class="punto"></span>Fuera</span>`
            : `<span class="estado dentro"><span class="punto"></span>Dentro</span>`;
        const placas = a.placas && a.placas.trim() !== "" ? esc(a.placas) : "—";

        return `
            <tr>
                <td class="td-nombre">${esc(a.nombre)}</td>
                <td><span class="badge badge-${esc(tipoClase(a.tipo))}">${esc(a.tipo)}</span></td>
                <td>${esc(a.departamento)}</td>
                <td>${placas}</td>
                <td>${esc(a.entrada)}</td>
                <td class="salida-td">${a.salida ? esc(a.salida) : "—"}</td>
                <td>${estado}</td>
            </tr>
        `;
    });

    historialTabla.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Departamento</th>
                    <th>Placas</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>${filas.join("")}</tbody>
        </table>
    `;
}

function tipoClase(tipo) {
    const normalizado = (tipo || "").trim().replace(/\s+/g, " ");
    return normalizado in TIPO_CLASES ? TIPO_CLASES[normalizado] : "Otro";
}

formEntrada.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        nombre: $("nombre").value.trim(),
        tipo: $("tipo").value,
        departamento: $("departamento").value.trim(),
        placas: $("placas").value.trim()
    };

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "No se pudo registrar la entrada.");
        }

        formEntrada.reset();
        $("nombre").focus();
        mostrarMensaje(`Entrada registrada para ${payload.nombre}.`, "ok");
        await cargarAccesos();
    } catch (err) {
        mostrarMensaje(err.message, "error");
    }
});

dentroLista.addEventListener("click", async (e) => {
    const btn = e.target.closest(".btn-salida");
    if (!btn) return;

    const id = btn.dataset.id;
    const acceso = accesos.find((a) => String(a.id) === id);

    try {
        const res = await fetch(`${API}/${id}/salida`, { method: "PUT" });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "No se pudo registrar la salida.");
        }

        mostrarMensaje(`Salida registrada para ${data.nombre}.`, "ok");
        await cargarAccesos();
    } catch (err) {
        mostrarMensaje(err.message, "error");
    }
});

filtroTipo.addEventListener("change", () => {
    filtroActual = filtroTipo.value;
    renderHistorial();
});

function actualizarReloj() {
    const ahora = new Date();
    $("hora").textContent = ahora.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
    });
    $("fecha").textContent = ahora.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

setInterval(actualizarReloj, 1000);
actualizarReloj();
cargarAccesos();