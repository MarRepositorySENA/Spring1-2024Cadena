function loadPaciente(){ 
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/pacientes/findByTrue',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function(items){
        var registros = `<option selected="" selected disabled hidden>--- Seleccione ---</option>`;
        items.forEach(function(item, index, array){
            registros += `
                <option value="`+item.id+`">`+item.primerNombre+` - `+item.primerApellido+`</option>
            `;
        })
        $("#pacienteId").html(registros);
    })
}

function loadMedico(){
    $.ajax({
        url: 'http://localhost:9000/medicina/api/v1/medicina/medicos/findByTrue',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function(items){
        var registros = `<option selected="" selected disabled hidden>--- Seleccione ---</option>`;
        items.forEach(function(item, index, array){
            registros += `
            <option value="`+item.id+`">`+item.primerNombre+` - `+item.primerApellido+`</option>
            `;
        })
        $("#medicoId").html(registros);
    })
}