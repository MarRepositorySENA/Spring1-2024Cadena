document.addEventListener('DOMContentLoaded', function() {
    cargarMedicos();
});

function cargarMedicos() {
    fetch('http://localhost:9000/medicos') // Tu URL de la API para obtener médicos
        .then(response => response.json())
        .then(medicos => {
            const medicosList = document.getElementById('medicos-list');
            medicos.forEach(medico => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${medico.documentoIdentidad}</td>
                    <td>${medico.primerNombre}</td>
                    <td>${medico.primerApellido}</td>
                    <td>${medico.celular}</td>
                    <td>${medico.correoElectronico}</td>
                `;
                medicosList.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar médicos:', error));
}