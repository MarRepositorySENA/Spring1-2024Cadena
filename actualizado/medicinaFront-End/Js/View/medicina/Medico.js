//Cargar de manera automatica los datos regostrados
// Busqueda por id
function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/medicos/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id),
        $("#telefono").val(item.telefono),
        $("#primer_nombre_medico").val(item.primerNombre),
        $("#mail").val(item.correo),
        $("#primer_apellido_medico").val(item.primerApellido),
        $("#segundo_apellido_medico").val(item.segundoApellido),
        $("#segundo_nombre_medico").val(item.segundoNombre),
        $("#documento").val(item.numeroDocumento)
        $("#estado").val(item.estado == true ? '1' : '0')
    })
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/medicos/',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) {
            registros += `

                        <tr class="table-light">
                        <td>`+ item.primerNombre + ` ` + item.segundoNombre + `</td>
                        <td>`+ item.primerApellido + ` ` + item.primerApellido + `</td>
                        <td>`+ item.numeroDocumento + `</td>
                        <td>`+ item.correo + `</td>
                        <td>`+ item.telefono + `</td>
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
        url: 'http://localhost:9000/medicina/api/v1/medicina/medicos/' + id,
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
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Libro eliminado',
        });
    })
}


//Accion de adicionar un registro
function Add() {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/medicos/',
        data: JSON.stringify({
            telefono: $("#telefono").val(),
            primerNombre: $("#primer_nombre_medico").val(),
            correo: $("#mail").val(),
            primerApellido: $("#primer_apellido_medico").val(),
            segundoApellido: $("#segundo_apellido_medico").val(),
            segundoNombre: $("#segundo_nombre_medico").val(),
            numeroDocumento: $("#documento").val(),
            estado: parseInt($("#estado").val())
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        //Cargar datos
        loadTable();

        //Limpiar formulario
        clearData();

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 7000,
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
        url: 'http://localhost:9000/medicina/api/v1/medicina/medicos/' + $("#id").val(),
        data: JSON.stringify({
            telefono: $("#telefono").val(),
            primerNombre: $("#primer_nombre_medico").val(),
            correo: $("#mail").val(),
            primerApellido: $("#primer_apellido_medico").val(),
            segundoApellido: $("#segundo_apellido_medico").val(),
            segundoNombre: $("#segundo_nombre_medico").val(),
            numeroDocumento: $("#documento").val(),
            estado: parseInt($("#estado").val())
        }),
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        //Cargar datos
        loadTable();

        //Limpiar formulario
        clearData();


        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
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
    })
}

// Función para limpiar datos
function clearData() {
    $("#id").val(""),
    $("#telefono").val(""),
    $("#primer_nombre_medico").val(""),
    $("#mail").val(""),
    $("#primer_apellido_medico").val(""),
    $("#segundo_apellido_medico").val(""),
    $("#segundo_nombre_medico").val(""),
    $("#documento").val(""),
    $("#estado").val("")
}

