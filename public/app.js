const departamentoSelect =
    document.getElementById("departamento");

const residenteSelect =
    document.getElementById("residente");

const visitaForm =
    document.getElementById("visitaForm");

const residenteForm =
    document.getElementById("residenteForm");

const timestampInput =
    document.getElementById("timestamp");

const visitasTable =
    document.getElementById("visitasTable");

const residentesTable =
    document.getElementById("residentesTable");


// ==========================================
// BADGES PARA TIPO DE VISITANTE
// ==========================================

const tipoBadges = {
    "Familia": "badge-familia",
    "Amigo": "badge-amigo",
    "Proveedor": "badge-proveedor",
    "Taxi": "badge-taxi",
    "Técnico": "badge-tecnico",
    "Repartidor": "badge-repartidor",
    "Otro": "badge-otro"
};


// ==========================================
// MOSTRAR FECHA Y HORA ACTUAL
// ==========================================

function actualizarTimestamp() {

    const ahora = new Date();

    timestampInput.value =
        ahora.toLocaleString("es-MX", {
            dateStyle: "short",
            timeStyle: "short"
        });
}

actualizarTimestamp();

setInterval(actualizarTimestamp, 1000);


// ==========================================
// CARGAR RESIDENTES
// ==========================================

async function cargarResidentes() {

    const response =
        await fetch("/api/residentes");

    const residentes =
        await response.json();

    return residentes;
}


// ==========================================
// CAMBIAR DEPARTAMENTO
// ==========================================

departamentoSelect.addEventListener(
    "change",
    async () => {

        const departamento =
            departamentoSelect.value;

        residenteSelect.innerHTML = "";

        if (!departamento) {

            residenteSelect.disabled = true;

            residenteSelect.innerHTML = `
                <option value="">
                    Primero selecciona un departamento
                </option>
            `;

            return;
        }

        const residentes =
            await cargarResidentes();

        const residentesDepartamento =
            residentes.filter(
                residente =>
                    residente.departamento === departamento
            );

        residenteSelect.disabled = false;

        if (residentesDepartamento.length === 0) {

            residenteSelect.innerHTML = `
                <option value="">
                    No hay residentes registrados
                </option>
            `;

            return;
        }

        residenteSelect.innerHTML = `
            <option value="">
                Seleccionar residente...
            </option>
        `;

        residentesDepartamento.forEach(
            residente => {

                const option =
                    document.createElement("option");

                option.value =
                    residente.id;

                option.textContent =
                    residente.nombre;

                residenteSelect.appendChild(option);

            }
        );

    }
);


// ==========================================
// REGISTRAR VISITA
// ==========================================

visitaForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const departamento =
            departamentoSelect.value;

        const residenteId =
            residenteSelect.value;

        const visitante =
            document.getElementById(
                "visitante"
            ).value.trim();

        const tipo =
            document.getElementById(
                "tipo"
            ).value;


        if (
            !departamento ||
            !residenteId ||
            !visitante ||
            !tipo
        ) {

            alert(
                "Completa todos los campos."
            );

            return;
        }


        const response =
            await fetch("/api/visitas", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    departamento,

                    residenteId,

                    visitante,

                    tipo

                })

            });


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.error);

            return;
        }


        alert(
            "Visita registrada correctamente."
        );


        visitaForm.reset();

        residenteSelect.disabled = true;

        residenteSelect.innerHTML = `
            <option value="">
                Primero selecciona un departamento
            </option>
        `;


        actualizarTimestamp();

        cargarVisitas();

    }
);


// ==========================================
// REGISTRAR NUEVO RESIDENTE
// ==========================================

residenteForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const nombre =
            document.getElementById(
                "nuevoNombre"
            ).value.trim();

        const departamento =
            document.getElementById(
                "nuevoDepartamento"
            ).value;


        if (!nombre || !departamento) {

            alert(
                "Completa todos los campos."
            );

            return;
        }


        const response =
            await fetch("/api/residentes", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    nombre,

                    departamento

                })

            });


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.error);

            return;
        }


        alert(
            "Residente registrado correctamente."
        );


        residenteForm.reset();

        cargarListaResidentes();

    }
);


// ==========================================
// CARGAR LISTA DE VISITAS
// ==========================================

async function cargarVisitas() {

    const response =
        await fetch("/api/visitas");

    const visitas =
        await response.json();


    visitasTable.innerHTML = "";


    if (visitas.length === 0) {

        visitasTable.innerHTML = `
            <tr>
                <td class="empty" colspan="5">
                    No hay visitas registradas.
                </td>
            </tr>
        `;

        return;
    }


    visitas.forEach(visita => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${visita.visitante}</td>

            <td>${visita.departamento}</td>

            <td>${visita.residente}</td>

            <td>
                <span class="badge ${tipoBadges[visita.tipo] || "badge-otro"}">
                    ${visita.tipo}
                </span>
            </td>

            <td>${visita.timestamp}</td>

        `;

        visitasTable.appendChild(row);

    });

}


// ==========================================
// CARGAR LISTA DE RESIDENTES
// ==========================================

async function cargarListaResidentes() {

    const residentes =
        await cargarResidentes();

    residentesTable.innerHTML = "";

    if (residentes.length === 0) {

        residentesTable.innerHTML = `
            <tr>
                <td class="empty" colspan="2">
                    No hay residentes registrados.
                </td>
            </tr>
        `;

        return;
    }

    residentes.forEach(residente => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${residente.nombre}</td>

            <td>${residente.departamento}</td>

        `;

        residentesTable.appendChild(row);

    });

}


// ==========================================
// INICIALIZAR
// ==========================================

cargarVisitas();

cargarListaResidentes();
