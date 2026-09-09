const form = document.getElementById("accessForm");

const tipo = document.getElementById("tipo");

const residenteContainer =
    document.getElementById("residenteContainer");

const visitanteContainer =
    document.getElementById("visitanteContainer");

const residenteSelect =
    document.getElementById("residente");

const nombreInput =
    document.getElementById("nombre");

const departamentoSelect =
    document.getElementById("departamento");

const placasInput =
    document.getElementById("placas");

const accessTable =
    document.getElementById("accessTable");

const historyTable =
    document.getElementById("historyTable");

const filtroTipo =
    document.getElementById("filtroTipo");

const personasDentro =
    document.getElementById("personasDentro");

const totalAccesos =
    document.getElementById("totalAccesos");

const residentesDentro =
    document.getElementById("residentesDentro");


// ==========================================
// CARGAR RESIDENTES
// ==========================================

async function cargarResidentes() {

    try {

        const response =
            await fetch("/api/residentes");

        const residentes =
            await response.json();

        residenteSelect.innerHTML = `
            <option value="">
                Seleccionar residente...
            </option>
        `;

        residentes.forEach(residente => {

            const option =
                document.createElement("option");

            option.value = residente.id;

            option.textContent =
                `${residente.nombre} - Depto. ${residente.departamento}`;

            option.dataset.nombre =
                residente.nombre;

            option.dataset.departamento =
                residente.departamento;

            residenteSelect.appendChild(option);

        });

    } catch (error) {

        console.error(
            "Error al cargar residentes:",
            error
        );

    }
}


// ==========================================
// CAMBIAR TIPO DE ACCESO
// ==========================================

tipo.addEventListener("change", () => {

    if (tipo.value === "Residente") {

        residenteContainer.classList.remove("hidden");

        visitanteContainer.classList.add("hidden");

        nombreInput.value = "";

        nombreInput.required = false;

        residenteSelect.required = true;

        departamentoSelect.disabled = true;

    } else {

        residenteContainer.classList.add("hidden");

        visitanteContainer.classList.remove("hidden");

        nombreInput.required = true;

        residenteSelect.required = false;

        residenteSelect.value = "";

        departamentoSelect.disabled = false;

    }

});


// ==========================================
// SELECCIONAR RESIDENTE
// ==========================================

residenteSelect.addEventListener("change", () => {

    const option =
        residenteSelect.options[
            residenteSelect.selectedIndex
        ];

    if (!option || !option.dataset.nombre) {
        return;
    }

    nombreInput.value =
        option.dataset.nombre;

    departamentoSelect.value =
        option.dataset.departamento;

});


// ==========================================
// CARGAR ACCESOS
// ==========================================

async function cargarAccesos() {

    try {

        const response =
            await fetch("/api/accesos");

        const accesos =
            await response.json();

        mostrarAccesos(accesos);

        mostrarHistorial(accesos);

        mostrarEstadisticas(accesos);

    } catch (error) {

        console.error(
            "Error al cargar accesos:",
            error
        );

    }

}


// ==========================================
// MOSTRAR PERSONAS DENTRO
// ==========================================

function mostrarAccesos(accesos) {

    accessTable.innerHTML = "";

    const filtro =
        filtroTipo.value;

    let personasDentro =
        accesos.filter(
            acceso => acceso.salida === null
        );

    if (filtro !== "Todos") {

        personasDentro =
            personasDentro.filter(
                acceso => acceso.tipo === filtro
            );

    }

    if (personasDentro.length === 0) {

        accessTable.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    No hay personas dentro.
                </td>
            </tr>
        `;

        return;
    }

    personasDentro.forEach(acceso => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${acceso.nombre}</td>

            <td>${acceso.tipo}</td>

            <td>${acceso.departamento}</td>

            <td>${acceso.placas || "-"}</td>

            <td>${acceso.entrada}</td>

            <td>
                <button
                    class="exit-button"
                    onclick="registrarSalida(${acceso.id})">
                    Registrar salida
                </button>
            </td>
        `;

        accessTable.appendChild(row);

    });

}


// ==========================================
// MOSTRAR HISTORIAL
// ==========================================

function mostrarHistorial(accesos) {

    historyTable.innerHTML = "";

    accesos.forEach(acceso => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${acceso.nombre}</td>

            <td>${acceso.tipo}</td>

            <td>${acceso.departamento}</td>

            <td>${acceso.entrada}</td>

            <td>
                ${acceso.salida || "Dentro"}
            </td>
        `;

        historyTable.appendChild(row);

    });

}


// ==========================================
// ESTADÍSTICAS
// ==========================================

function mostrarEstadisticas(accesos) {

    const dentro =
        accesos.filter(
            acceso => acceso.salida === null
        );

    const residentes =
        dentro.filter(
            acceso => acceso.tipo === "Residente"
        );

    personasDentro.textContent =
        dentro.length;

    totalAccesos.textContent =
        accesos.length;

    residentesDentro.textContent =
        residentes.length;

}


// ==========================================
// REGISTRAR ENTRADA
// ==========================================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    let nombre;

    let departamento =
        departamentoSelect.value;

    const tipoSeleccionado =
        tipo.value;

    if (tipoSeleccionado === "Residente") {

        const option =
            residenteSelect.options[
                residenteSelect.selectedIndex
            ];

        if (!option || !option.dataset.nombre) {

            alert(
                "Selecciona un residente."
            );

            return;
        }

        nombre =
            option.dataset.nombre;

        departamento =
            option.dataset.departamento;

    } else {

        nombre =
            nombreInput.value.trim();

    }


    if (!nombre ||
        !tipoSeleccionado ||
        !departamento) {

        alert(
            "Completa todos los campos obligatorios."
        );

        return;

    }


    try {

        const response =
            await fetch("/api/accesos", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    nombre: nombre,

                    tipo: tipoSeleccionado,

                    departamento: departamento,

                    placas:
                        placasInput.value.trim()

                })

            });


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.error);

            return;

        }


        alert(
            "Entrada registrada correctamente."
        );


        form.reset();


        residenteContainer
            .classList.add("hidden");

        visitanteContainer
            .classList.remove("hidden");

        nombreInput.required = true;

        residenteSelect.required = false;

        departamentoSelect.disabled = false;


        cargarAccesos();


    } catch (error) {

        console.error(error);

        alert(
            "No fue posible registrar la entrada."
        );

    }

});


// ==========================================
// REGISTRAR SALIDA
// ==========================================

async function registrarSalida(id) {

    const confirmar =
        confirm(
            "¿Deseas registrar la salida de esta persona?"
        );

    if (!confirmar) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/accesos/${id}/salida`,
                {
                    method: "PUT"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.error);

            return;

        }


        cargarAccesos();


    } catch (error) {

        console.error(error);

        alert(
            "No fue posible registrar la salida."
        );

    }

}


// ==========================================
// FILTRO
// ==========================================

filtroTipo.addEventListener(
    "change",
    cargarAccesos
);


// ==========================================
// INICIALIZAR
// ==========================================

cargarResidentes();

cargarAccesos();
