function LoadProfile() {
    // Obtener los datos del usuario almacenados en localStorage
    var userData = JSON.parse(localStorage.getItem('userData'));

    // Verificar si userData existe y si el id es mayor que 0
    if (userData && userData.id > 0) {
        var spanElement = document.querySelector('#nameUser');
        var spanElementG = document.querySelector('#gmailUser');
        

    
        // Verificar si el elemento <span> existe antes de intentar modificarlo
        if (spanElement) {
            // Modificar el texto del elemento <span> con el nombre del usuario
            spanElement.textContent = userData.personName;
            spanElementG.textContent = userData.personEmail;

        }

        console.log(userData.id);
        var id = userData.id;

        // Llamar a la función findById con el id del usuario
        findById(id);
    } else {
        console.log('No se encontraron datos de usuario válidos.');
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
        $('#address').val(data.address);
  
        $("#selected_city_id").val(data.city.id);
        $("#city_id").val(data.city.firstName + " " + data.city.lastName);
  
        $("#estado").val(data.state == true ? 1 : 0);
        
        // Cambiar boton.
        var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Actualizar");
        btnAgregar.attr("onclick", "update()");
      },
      error: function (error) {
        // Función que se ejecuta si hay un error en la solicitud
        console.error("Error en la solicitud:", error);
        window.location.href = "/Frontend Service-security/404.html";
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

