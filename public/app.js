let turnoIdSeleccionado = null;

async function cargarTurnos() {
  const res = await fetch("/turnos");
  const turnos = await res.json();
  const tbody = document.getElementById("tablaTurnos");
  tbody.innerHTML = "";

  turnos.forEach(t => {
    tbody.innerHTML += `
      <tr class="hover:bg-gray-100">
        <td class="p-3">${t.id}</td>
        <td class="p-3">${t.paciente}</td>
        <td class="p-3">${t.clinica}</td>
        <td class="p-3 text-center">
          <button onclick="abrirModal(${t.id})"
            class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            Reasignar
          </button>
        </td>
      </tr>
    `;
  });
}

function abrirModal(id) {
  turnoIdSeleccionado = id;
  document.getElementById("modal").classList.remove("hidden");
}

function cerrarModal() {
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("guardarBtn").onclick = async () => {
  const nuevaClinica = document.getElementById("nuevaClinica").value;
  const motivo = document.getElementById("motivo").value;

  if (!motivo.trim()) {
    alert("El motivo es obligatorio");
    return;
  }

  await fetch(`/reasignar/${turnoIdSeleccionado}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nuevaClinica, motivo })
  });

  cerrarModal();
  cargarTurnos();
};

cargarTurnos();
