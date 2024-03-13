//Cargar de manera automatica los datos regostrados
// Busqueda por id
function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/ingresos/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#fechaPrestamo").val(item.fechaIngreso)
        $("#fechaEntrega").val(item.idpaciente.id)
        $("#usuarioId").val(item.habitacion)
        $("#libroId").val(item.cama)
        $("#libroId").val(item.fechaSalida)
        $("#totalPagar").val(item.idmedico.id)
        $("#estado").val(item.estado == true ? '1' : '0')
    })
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/ingresos/',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += `

                        <tr class="table-light">
                            <td>`+ item.idpaciente.primerNombre + ` ` + item.idpaciente.primerApellido + `</td>
                            <td>`+ item.fechaIngreso + `</td>
                            <td>`+ item.habitacion + `</td>
                            <td>`+ item.cama + `</td>
                            <td>`+ item.idmedico.primerNombre + ` ` + item.idmedico.primerApellido + `</td>
                            <td>`+ item.fechaSalida + `</td>
                            <td>`+ (item.estado == true ? 'Activo' : 'Inactivo') + `</td>
                            <td><button class="btnEdit" type="button" onclick="findById(`+ item.id + `);"><i class="fi fi-rr-pencil"></i></button></td>
                            <td><button class="btnDelete" type="button" onclick="deleteById(`+ item.id + `);"><i class="fi fi-rr-trash"></i></button></td>
                        </tr>
                        `;
        })
        $("#dataResult").html(registros);
    })
}

//Accion para eliminar un registro seleccionado 
function deleteById(id) {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/ingresos/' + id,
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {

        loadTable();

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Registro eliminado',
        })


    })
}


//Accion de adicionar un registro
function Add() {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/ingresos/',
        data: JSON.stringify({
            fechaIngreso: $("#fecha").val(),
            idpaciente: {
                id: $("#pacienteId").val()
            },
            habitacion: $("#habitacion").val(),
            cama: $("#cama").val(),
            idmedico: {
                id: $("#medicoId").val()
            },
            fechaSalida: $("#fecha_salida").val(),
            estado: parseInt($("#estado").val())
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {

        // Si la respuesta es un ok
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Registro exitoso',
        })

        //Cargar datos
        loadTable();

        //Limpiar formulario
        clearData();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // Si la respuesta es un error
        Swal.fire({
            icon: 'error',
            title: "Error",
            text: jqXHR.responseJSON.message,
        })
    });
}


//Accion de actualizar un registro
function Update() {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/ingresos/' + $("#id").val(),
        data: JSON.stringify({
            fechaIngreso: $("#fecha").val(),
            idpaciente: {
                id: $("#pacienteId").val()
            },
            habitacion: $("#habitacion").val(),
            cama: $("#cama").val(),
            idmedico: {
                id: $("#medicoId").val()
            },
            fechaSalida: $("#fecha_salida").val(),
            estado: parseInt($("#estado").val())
        }),
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'warning',
            title: 'Modificación exitosa',
        })


        //Cargar datos
        loadTable();

        //Limpiar formulario
        clearData();
    })
}

// Función para limpiar datos
function clearData() {
        $("#id").val("");
        $("#fechaPrestamo").val("");
        $("#fechaEntrega").val("");
        $("#usuarioId").val("");
        $("#libroId").val("");
        $("#libroId").val("");
        $("#totalPagar").val("");
        $("#estado").val("");
}



