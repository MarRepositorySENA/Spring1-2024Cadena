function save() {
  try {
    // var selectedCityId = parseInt($("#selected_city_id").val());
    // if (isNaN(selectedCityId) || selectedCityId === null) {
    //   console.error("ID de ciudad no válido");
    //   return;
    // }

    var personData = {
      "firstName": $("#firstName").val(),
      "lastName": $("#lastName").val(),
      "typeDocument": $("#t_document").val(),
      "document": $("#document").val(),
      "email": $("#email").val(),
      "phone": $("#phone").val(),
      "dateOfBirth": $("#dateOfBirth").val(),
      "gender": $("#gender").val(),
      "address": $("#address").val() + ' No ' + $("#numeral").val() + ' - ' + $("#numeral2").val()  +' - ' + $("#description").val(),
      "ubication": $("#city_id").val(),
      // "city": {
      //    "id": selectedCityId
      // },
      "state": true
    };


 
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/person",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(personData),
      success: function(data) {

         
          clearData();
          loadData();


      
            Swal.fire({
              title: "Perfect!",
              text: "saved successfully ",
              icon: "success",
              timer: 2000, 
              buttons: false 
          })
       
             
     
      },
      error: function(error) {
        
          if (error.responseJSON && error.responseJSON.message) {

            Swal.fire({
              title: "error :(!",
              text: error.responseJSON.message,
              icon: "error",
              timer: 5000, 
              buttons: false 
          })
             
          } else {
              alert("Error al guardar el registro");
          }
      }
  });
  
  } catch (error) {
    console.error("Error obteniendo el cliente:", error);
  }

 
}







function loadCity() {
  console.log("ejecutando loadCity");
  $.ajax({
    url: "http://localhost:9000/service-security/v1/api/municipality",
    method: "GET",
    dataType: "json",
    success: function (response) {
      if (response.status && Array.isArray(response.data)) {
        var cities = response.data.map(function (municipality) {
          return {
            label: municipality.name,
            value: municipality.id // Agrega el ID como valor
          };
        });

        // Inicializar el autocompletado en el campo de entrada de texto
        $("#city_id").autocomplete({
          source: cities,
          select: function (event, ui) {
            // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
            $("#selected_city_id").val(ui.item.value);
            // Actualiza el valor del campo de entrada con el nombre de la persona seleccionada
            $("#city_id").val(ui.item.label);
            console.log("ID de ciudad seleccionada: " + ui.item.value);
            return false; // Evita la propagación del evento y el formulario de envío
          }
        });
      } else {
        console.error("Error: No se pudo obtener la lista de ciudades.");
      }
    },
    error: function (error) {
      // Función que se ejecuta si hay un error en la solicitud
      console.error("Error en la solicitud:", error);
    },
  });
}




function clearData() {
  $("#id").val("");
  $("#firstName").val("");
  $("#lastName").val("");
  $("#t_document").val("");
  $("#document").val("");
  $("#email").val("");
  $("#phone").val("");
  $("#dateOfBirth").val("");
  $("#gender").val("");
  $("#address").val("");
  $("#city_id").val("");
 
  $("#estado").val("");
}



function loadData() {
  console.log("ejecutando loadData");
  $.ajax({
    url: "http://localhost:9000/service-security/v1/api/person",
    method: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response.data);
      var html = "";
      var data = response.data;
      data.forEach(function (item) {
        // Construir el HTML para cada objeto
        if (!item.deletedAt) { // Verificar si el campo deletedAt es nulo (no eliminado lógicamente)

        html +=
          `<tr>
                  <td>${item.firstName}</td>
                  <td>` + item.lastName + `</td>
                  <td>` + item.typeDocument + `</td>
                  <td>` + item.document + `</td>
                  <td>` + item.email + `</td>
                  <td>` + item.phone + `</td>
                  <td>` + item.dateOfBirth + `</td>
                  <td>` + item.gender + `</td>
                  <td>` + item.address + `</td>
                  <td>` + /*item.municipality.name*/ + `</td>
                  <td>` + (item.state == true ? "Activo" : "Inactivo") + `</td>
                  <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.id})"> <img src="/assets/icon/pencil-square.svg" > </button>
                  <button type="button" class="btn btn-secundary" onclick="deleteById(${item.id})"> <img src="/assets/icon/trash3.svg" > </button></td>
              </tr>`;
                       
                       };
      });

      $("#resultData").html(html);
    },
    error: function (error) {
      // Función que se ejecuta si hay un error en la solicitud
      console.error("Error en la solicitud:", error);
    },
  });
}


function deleteById(id) {
  $.ajax({
    url: "http://localhost:9000/service-security/v1/api/person/" + id,
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  }).done(function (result) {
    alert("Registro eliminado con éxito");
    loadData();
  });
}


function update() {
  // Construir el objeto data
 
  try{
    var data = {
      "firstName": $("#firstName").val(),
      "lastName": $("#lastName").val(),
      "typeDocument": $("#t_document").val(),
      "document": $("#document").val(),
      "email": $("#email").val(),
      "phone": $("#phone").val(),
      "dateOfBirth": $("#dateOfBirth").val(),
      "gender": $("#gender").val(),
      "address": $("#address").val() + ' No ' + $("#numeral").val() + ' - ' + $("#numeral2").val()  +' - ' + $("#description").val(),
      "ubication": $("#city_id").val(),
     
      "state": true
    };

    console.log(data);
    
    var id = $("#id").val();
    var jsonData = JSON.stringify(data);

    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/person/" + id,
      data: jsonData,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).done(function (result) {
      alert("Registro actualizado con éxito");
      loadData();
      clearData();
  
      //actualzar boton
      var btnAgregar = $('button[name="btnAgregar"]');
      btnAgregar.text("Agregar");
      btnAgregar.attr("onclick", "save()");
    });
  }catch (error) {
    alert("Error en actualizar user.");
    console.error("Error en la solicitud:", error);
    //actualzar boton
    loadData();
    clearData();
    var btnAgregar = $('button[name="btnAgregar"]');
    btnAgregar.text("Agregar");
    btnAgregar.attr("onclick", "save()");
  }
}

function findById(id) {
  $.ajax({
    url: "http://localhost:9000/service-security/v1/api/person/" + id,
    method: "GET",
    dataType: "json",
    success: function (response) {
      var data=response.data;
      $("#id").val(data.id);
      $("#firstName").val(data.firstName);
      $("#lastName").val(data.lastName);
      $("#t.document").val(data.typeDocument);
      $("#document").val(data.document);
      $('#email').val(data.email);
      $('#phone').val(data.phone);
      $('#dateOfBirth').val(data.dateOfBirth);
      $('#gender').val(data.gender);
      
var addressParts = data.address.split(' - ');
var address = addressParts[0].split(' No ');
var streetName = address[0];
var streetNumber = address[1];
var streetNumber2 = addressParts[1]; // Segundo número
var streetNumber3 = addressParts[2]; // Descripción

$('#address').val(streetName); // Primer input
$('#numeral').val(streetNumber); // Segundo input
$('#numeral2').val(streetNumber2); // Tercer input
$('#description').val(streetNumber3); // Cuarto input

  
     
      $("#city_id").val(data.ubication);
     
      $("#estado").val(data.state == true ? 1 : 0);

      //Cambiar boton.
      var btnAgregar = $('button[name="btnAgregar"]');
      btnAgregar.text("Actualizar");
      btnAgregar.attr("onclick", "update()");
    },
    error: function (error) {
      // Función que se ejecuta si hay un error en la solicitud
      console.error("Error en la solicitud:", error);
    },
  });
}


function clearData() {
  $("#id").val("");
 
  $("#email").val("");
  $("#phone").val("");
  $("#dateOfBirth").val("");
  $("#gender").val("");
  $("#address").val("");
  $("#city_id").val("");
 
  $("#estado").val("");
}
