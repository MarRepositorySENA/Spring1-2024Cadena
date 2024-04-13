


function add() {
  console.log("ad ejecutando");
 
    // var idToUse;
    // if (typeof id !== 'undefined') {
    //     idToUse = parseInt(id);
    // } else {
    //     idToUse = parseInt($("#selected_document_id").val());
    // }
    try {
        var data = {
          "state": true,
          "person": {
            "id": parseInt($("#selected_document_id").val())
          }
        };

       console.log( parseInt($("#selected_document_id").val()));
      var id = $("#id").val();
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/customer",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: jsonData,
        success: function(data) {
          // alert("Registro agregado con éxito customer");
          clearData();
          loadData();
        },
        error: function(error) {
         
          //console.log($("#person_id").val());
        },
      });
    } catch (error) {
      console.error("Error obteniendo el cliente:", error);
    }
  }


  function clearData() {
    $("#selected_document_id").val("");
    $("#document_id").val("");
    $("#selected_firsName_id").val("");
    $("#firstName_id").val("");
    $("#TypeDocument").val("");
  
    // var btnAgregar = $('button[name="btnAgregar"]');
    //       btnAgregar.text("agregarww");
    //       btnAgregar.attr("onclick", "save()");

          $("#searchButton").attr("data-bs-toggle", "modal");
          $("#searchButton").off("click").on("click", save);
          $("#searchButton").text("save");
  }


  function loadData() {
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/customer",
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log(response.data);
        var html = "";
        var data = response.data;
        data.forEach(function (item) {
          // Construir el HTML para cada objeto
          if (!item.deletedAt) {
          html +=
            `<tr>
                    <td>${item.person.firstName}</td>
                    <td>` + item.code + `</td>
                    
                    <td>` + item.person.email   + `</td>
                    <td>` + item.person.phone + `</td>

                 
                     <td>` + (item.state == true ? "Activo" : "Inactivo") + `</td>
                    <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.person.id})"> <img src="/Frontend Service-security/assets/icon/pencil-square.svg" > </button>
                    <button type="button" class="btn btn-secundary" onclick="deleteById(${item.id})"> <img src="/Frontend Service-security/assets/icon/trash3.svg" > </button></td>
                </tr>`;
          }
        });
  
        $("#resultData").html(html);
      },
      error: function (error) {
        // Función que se ejecuta si hay un error en la solicitud
        console.error("Error en la solicitud:", error);
        window.location.href = "/Frontend Service-security/404.html";
      },
    });
  }


  function deleteById(id) {
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/customer/" + id,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).done(function (result) {
      Swal.fire({
        title: "Perfect!",
        text: "deleted successfully",
        icon: "error",
        timer: 2000, 
        buttons: false 
    })
    loadData();
    });
  }


 

  function loadPerson() {
    console.log("ejecutando loadperson");
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/person",
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response.status && Array.isArray(response.data)) {
          var cities = response.data.map(function (person) {
            return {
              label: person.firstName,
              value: person.id // Agrega el ID como valor
            };
          });
  
          // Inicializar el autocompletado en el campo de entrada de texto
          $("#person_id").autocomplete({
            source: cities,
            select: function (event, ui) {
              // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
              $("#selected_person_id").val(ui.item.value);
              // Actualiza el valor del campo de entrada con el nombre de la persona seleccionada
              $("#person_id").val(ui.item.label);
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


// person
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

function findById(id) {
  $.ajax({
    url: "http://localhost:9000/service-security/v1/api/person/" + id,
    method: "GET",
    dataType: "json",
    success: function (response) {
      var data = response.data;
      
      $("#id").val(data.id);
      $("#firstName").val(data.firstName);
      $("#lastName").val(data.lastName);
      $("#t_document").val(data.typeDocument); // Corregir aquí el selector
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
      
      // Cambiar boton.
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
      // "city": {
      //   "id": selectedCityId
      // },
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
    
      Swal.fire({
        title: "Perfect!",
        text: "Registration successfully updated",
        icon: "success",
        timer: 2000, 
        buttons: false 
    })
      loadData();
      clearData();
  
      //actualzar boton
      var btnAgregar = $('button[name="btnAgregar"]');
      btnAgregar.text("Agregar");
      btnAgregar.attr("onclick", "validation()");
    });
  }catch (error) {
    alert("Error en actualizar user.");
    console.error("Error en la solicitud:", error);
    //actualzar boton
    loadData();
    clearData();
    var btnAgregar = $('button[name="btnAgregar"]');
    btnAgregar.text("Agregar");
    btnAgregar.attr("onclick", "validation()");
  }
}






