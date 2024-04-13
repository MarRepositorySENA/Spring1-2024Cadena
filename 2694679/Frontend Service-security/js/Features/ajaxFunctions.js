// ajaxFunctions.js
$(document).ready(function() {
    const genderSelect = $('#address');
  
    $.ajax({
      url: 'http://localhost:9000/service-security/v1/api/Enum/Nomenclature',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, option) {
          const optionElement = $('<option></option>').attr('value', option).text(option);
          genderSelect.append(optionElement);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error al obtener datos desde el endpoint:', errorThrown);
      }
    });
  });
  
  $(document).ready(function() {
    const genderSelect = $('#TypeDocument');
  
    $.ajax({
      url: 'http://localhost:9000/service-security/v1/api/Enum/TypeDocument',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, option) {
          const optionElement = $('<option></option>').attr('value', option).text(option);
          genderSelect.append(optionElement);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error al obtener datos desde el endpoint:', errorThrown);
      }
    });
  });
  
  
  $(document).ready(function() {
    const genderSelect = $('#gender');
  
    $.ajax({
      url: 'http://localhost:9000/service-security/v1/api/Enum/gender',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, option) {
          const optionElement = $('<option></option>').attr('value', option).text(option);
          genderSelect.append(optionElement);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error al obtener datos desde el endpoint:', errorThrown);
      }
    });
  });


  
  $(document).ready(function() {
    const genderSelect = $('#t_document');
    console.log("ejecutadon documen");
  
    $.ajax({
      url: 'http://localhost:9000/service-security/v1/api/Enum/TypeDocument',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, option) {
          const optionElement = $('<option></option>').attr('value', option).text(option);
          genderSelect.append(optionElement);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error al obtener datos desde el endpoint:', errorThrown);
      }
    });
  });



  

  function search() {
    $.ajax({
        url: "http://localhost:9000/service-security/v1/api/view",
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (response.status && Array.isArray(response.data)) {
                var views = response.data.map(function (view) {
                    return {
                        label: view.name,
                        value: view.route
                    };
                });

                $("#search_id").autocomplete({
                    source: views,
                    select: function (event, ui) {
                      $("#search_id").val(ui.item.label);

                        var selectedRoute = ui.item.value;

                        changeIframeSrc(selectedRoute);
                        return false;
                    }
                });
            } else {
                console.error("Error: No se pudo obtener la lista de vistas.");
            }
        },
        error: function (error) {
            console.error("Error en la solicitud:", error);
        }
    });
}

function changeIframeSrc(newSrc) {
    console.log(newSrc);
    var iframe = document.getElementById("contentFrame");
    if (iframe) {
        iframe.src = newSrc;
    } else {
        console.error("No se encontró el iframe con el ID 'contentFrame'.");
    }
}

function searchRoute() {
    // Obtener el valor seleccionado del autocompletado
    var selectedRoute = $("#search_id").val();

    // Cambiar la ruta del iframe al valor seleccionado
    changeIframeSrc(selectedRoute);
}




  // validation the input

 
var documentInput = document.getElementById('document');

// Agregar un evento para capturar la entrada del teclado
documentInput.addEventListener('input', function(event) {
  var currentValue = event.target.value;
  var cleanedValue = currentValue.replace(/\D/g, '');
  var limitedValue = cleanedValue.slice(0, 10);
  

  event.target.value = limitedValue;
});

  // validation the Documen num

  

    // validation the input

 
var documentInput = document.getElementById('document_id');

// Agregar un evento para capturar la entrada del teclado
documentInput.addEventListener('input', function(event) {
  var currentValue = event.target.value;
  var cleanedValue = currentValue.replace(/\D/g, '');
  var limitedValue = cleanedValue.slice(0, 10);
  

  event.target.value = limitedValue;
});

  // validation the Documen num

  
