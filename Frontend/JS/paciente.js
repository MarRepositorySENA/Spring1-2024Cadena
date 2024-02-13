document.addEventListener('DOMContentLoaded', function() {
    cargarPacientes();
});

function cargarPacientes() {
    fetch('http://localhost:8080/pacientes') // Tu URL de la API para obtener pacientes
        .then(response => response.json())
        .then(pacientes => {
            const pacientesList = document.getElementById('pacientes-list');
            pacientes.forEach(paciente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${paciente.documentoIdentidad}</td>
                    <td>${paciente.primerNombre}</td>
                    <td>${paciente.primerApellido}</td>
                    <td>${paciente.celular}</td>
                    <td>${paciente.correoElectronico}</td>
                `;
                pacientesList.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar pacientes:', error));
}