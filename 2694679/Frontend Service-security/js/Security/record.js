function save(){
  
  console.log("ejecutando save");
  try {
    var selectedCityId = parseInt($("#selected_city_id").val());
    if (isNaN(selectedCityId) || selectedCityId === null) {
      Swal.fire({
        title: "Oops!",
        text: "failed registration city!",
        icon: "error",
        timer: 2000, 
        buttons: false 
    });
      return;
    }

    var personData = {
      "firstName": $("#firstName").val(),
      "lastName": $("#lastName").val(),
      "typeDocument": $("#tDocument").val(),
      "document": $("#document").val(),
      "email": $("#email").val(),
      "phone": $("#phone").val(),
      "dateOfBirth": $("#dateOfBirth").val(),
      "gender": $("#gender").val(),
      "address": $("#address").val() + ' No ' + $("#numeral").val() + ' - ' + $("#numeral2").val()  +' - ' + $("#description").val(),
      "ubication": $("#city_id").val(),
      "city": {
        "id": selectedCityId
      },
      "state": true
    };

    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/person",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(personData),
      success: function(data) {
        var id = data.data.id;
        console.log(data);
       
        User(id); // Aquí se pasa el ID a la función User
       // alert("Registro agregado con éxito" + id);
        clearData();
        loadData();
      },
      error: function(error) {
      
      },
    });
  } catch (error) {
    console.error("Error obteniendo el cliente:", error);
  }
}


function User(id) {
  try {
    var data = {
      "username": $("#email").val(),
      "password": $("#password").val(),
      "person": {
        "id": id
      },
      "role": [{
        "id": 2
      }],
      "state": true
    };

    var jsonData = JSON.stringify(data);
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/user",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: jsonData,
      success: function(data) {
        
        Swal.fire({
          title: "Perfect!",
          text: "Successful registration!",
          icon: "success",
          timer: 2000, 
          buttons: false 
      }).then(()=>{
        window.location.href = '/Frontend Service-security/view/Security/login.html';
      });
        
        
      },
      error: function(error) {
        alert(`La persona: ${$("#person_id").val()} ya cuenta con una cuenta de usuario`);
      },
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
    $("#email").val("");
    $("#phone").val("");
    $("#dateOfBirth").val("");
    $("#gender").val("");
    $("#address").val("");
    $("#city_id").val("");
   
    $("#estado").val("");
  }