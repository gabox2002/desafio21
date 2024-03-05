const form = document.getElementById("form");
const infoList = document.getElementById("infoList");
const infoHeader = document.getElementById("infoHeader");

function saveInfo(info) {
    const infoArray = JSON.parse(localStorage.getItem("infoArray")) || [];
    infoArray.push(info);
    localStorage.setItem("infoArray", JSON.stringify(infoArray));
}

function loadInfo() {
    const infoArray = JSON.parse(localStorage.getItem("infoArray")) || [];
    const infoTable = document.getElementById("infoTable");
    infoTable.innerHTML = "";

    if (infoArray.length > 0) {
        // Crear encabezado de la tabla
        const headerRow = infoTable.insertRow(0);
        const headers = ["Nombre", "Dirección", "Correo", "Acción"];
        headers.forEach((header) => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });

        // Llenar la tabla con la información
        infoArray.forEach((info, index) => {
            const row = infoTable.insertRow(index + 1);

            // Datos
            const cellName = row.insertCell(0);
            cellName.textContent = info.name;

            const cellAddress = row.insertCell(1);
            cellAddress.textContent = info.address;

            const cellEmail = row.insertCell(2);
            cellEmail.textContent = info.email;

            // Botón de acción
            const action = row.insertCell(3);
            const deleteBtn = document.createElement("button");

            deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
            deleteBtn.className = "btn btn-delete";

            deleteBtn.title = "Eliminar";

            deleteBtn.onclick = function () {
                const index = infoArray.indexOf(info);
                infoArray.splice(index, 1);
                localStorage.setItem("infoArray", JSON.stringify(infoArray));
                loadInfo();
            };
            action.appendChild(deleteBtn);
        });
    }

    infoHeader.style.display = infoArray.length > 0 ? "block" : "none";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const info = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        email: document.getElementById("email").value,
    };
    saveInfo(info);
    loadInfo();
    form.reset();
});

loadInfo();
