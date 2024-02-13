document.addEventListener('DOMContentLoaded', function() {
    cargarIngresos();
});

function cargarIngresos() {
    fetch('http://localhost:8080/ingresos') // URL de la API para obtener ingresos
        .then(response => response.json())
        .then(ingresos => {
            const ingresosList = document.getElementById('ingresos-list');
            ingresos.forEach(ingreso => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ingreso.fechaIngreso}</td>
                    <td>${ingreso.fechaSalida}</td>
                    <td>${ingreso.habitacion}</td>
                    <td>${ingreso.cama}</td>
                    <td>${ingreso.paciente}</td>
                    <td>${ingreso.medico}</td>
                    <td>${ingreso.estado}</td>
                `;
                ingresosList.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar ingresos:', error));
}
