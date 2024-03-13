//Cargar de manera automatica los datos regostrados
// Busqueda por id
function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/pacientes/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#nombre_acompanante").val(item.nombrePersonaContacto)
        $("#telefono_acompanante").val(item.telefonoPersonaContacto)
        $("#telefono_persona").val(item.telefono)
        $("#primer_nombre_paciente").val(item.primerNombre)
        $("#segundo_nombre_paciente").val(item.segundoNombre)
        $("#primer_apellido_paciente").val(item.primerApellido)
        $("#segundo_apellido_paciente").val(item.segundoApellido)
        $("#documento").val(item.numeroDocumento)
        $("#mail").val(item.correo)
        $("#estado").val(item.estado == true ? '1' : '0')
    })
}

function loadTable() {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/pacientes/',
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
                            <td>`+ item.telefono + `</td>
                            <td>`+ item.correo + `</td>
                            <td>`+ item.nombrePersonaContacto + `</td>
                            <td>`+ item.telefonoPersonaContacto + `</td>
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
        url: 'http://localhost:9000/medicina/api/v1/medicina/pacientes/' + id,
        method: "delete",
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
            icon: 'error',
            title: 'Usuario eliminado',
        });
        loadTable();
    })
}


//Accion de adicionar un registro
function Add() {
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/pacientes/',
        data: JSON.stringify({
            correo: $("#correo").val(),
            nombrePersonaContacto: $("#nombre_acompanante").val(),
            telefonoPersonaContacto: $("#telefono_acompanante").val(),
            telefono: $("#telefono_persona").val(),
            primerNombre: $("#primer_nombre_paciente").val(),
            segundoNombre: $("#segundo_nombre_paciente").val(),
            primerApellido: $("#primer_apellido_paciente").val(),
            segundoApellido: $("#segundo_apellido_paciente").val(),
            numeroDocumento: $("#documento").val(),
            correo: $("#mail").val(),
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
        });
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
        url: 'http://localhost:9000/medicina/api/v1/medicina/pacientes/' + $("#id").val(),
        data: JSON.stringify({
            correo: $("#correo").val(),
            nombrePersonaContacto: $("#nombre_acompanante").val(),
            telefonoPersonaContacto: $("#telefono_acompanante").val(),
            telefono: $("#telefono_persona").val(),
            primerNombre: $("#primer_nombre_paciente").val(),
            segundoNombre: $("#segundo_nombre_paciente").val(),
            primerApellido: $("#primer_apellido_paciente").val(),
            segundoApellido: $("#segundo_apellido_paciente").val(),
            numeroDocumento: $("#documento").val(),
            correo: $("#mail").val(),
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
        });
    })
}

// Función para limpiar datos
function clearData() {
    $("#correo").val(""),
    $("#telefono_acompanante").val(""),
    $("#nombre_acompanante").val(""),
    $("#primer_nombre_paciente").val(""),
    $("#segundo_nombre_paciente").val(""),
    $("#primer_apellido_paciente").val(""),
    $("#segundo_apellido_paciente").val(""),
    $("#telefono_persona").val(""),
    $("#documento").val(""),
    $("#mail").val(""),
    $("#estado").val("");
}





