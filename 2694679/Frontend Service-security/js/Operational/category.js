function save() {
   

    try {
      
      var data = {
      
        "name":  $("#name").val(),

        "description": $("#description").val(),
        "state": parseInt($("#estate").val())
      };
  
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/category",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: jsonData,
        success: function(data) {
          Swal.fire({
            title: "Perfect!",
            text: "Registration successfully created",
            icon: "success",
            timer: 2000, 
            buttons: false 
        })
          clearData();
          loadData();
        },
        error: function(error) {
          alert(`Error no se pudo realizar el registro.`);
          //console.log($("#person_id").val());
        },
      });
    } catch (error) {
      console.error("Error obteniendo el cliente:", error);
    }
  }


  function clearData() {
    $("#id").val("");
    $("#nit").val("");
    $("#rs").val("");
    $("#web").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#person_id").val("");
    $("#address").val("");
    $("#estate").val("");
    var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
  }


  function loadData() {
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/category",
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
                    <td>${item.name}</td>
                    <td>` + item.description+ `</td>
                   
                     <td>` + (item.state == true ? "Activo" : "Inactivo") + `</td>
                    <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.id})"> <img src="/Frontend Service-security/assets/icon/pencil-square.svg" > </button>
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
      url: "http://localhost:9000/service-security/v1/api/category/" + id,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).done(function (result) {
      Swal.fire({
        title: "Perfect!",
        text: "Registration successfully deleat",
        icon: "success",
        timer: 2000, 
        buttons: false 
    })
      loadData();
    });
  }


  function update() {
 
    // Construir el objeto data
    try{
        var data = {
      
            "name":  $("#name").val(),
    
            "description": $("#description").val(),
            "state": parseInt($("#estate").val())
          };
      
  
      
      var id = $("#id").val();
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/category/"+id,
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
    console.log(id +"id de modificar");
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/category/"+ id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        var data=response.data;
    
        $("#id").val(data.id);
        $('#name').val(data.name);
        $('#description ').val(data.description);
        
        $("#estate").val(data.state == true ? 1 : 0);
  
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
