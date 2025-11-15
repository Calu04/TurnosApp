let turnoIdSeleccionado = null;

async function cargarTurnos() {
  const res = await fetch("/turnos");
  const turnos = await res.json();
  const tbody = document.querySelector("#tablaTurnos tbody");
  tbody.innerHTML = "";

  turnos.forEach(t => {
    tbody.innerHTML += `
      <tr>
        <td>${t.id}</td>
        <td>${t.paciente}</td>
        <td>${t.clinica}</td>
        <td>
          <button onclick="abrirModal(${t.id})">Reasignar</button>
        </td>
      </tr>
    `;
  });
}

function abrirModal(id) {
  turnoIdSeleccionado = id;
  document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
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
