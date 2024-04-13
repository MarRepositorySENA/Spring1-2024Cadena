function save() {

    var selectedcategoryId = parseInt($("#selected_category_id").val());
    if (isNaN(selectedcategoryId) || selectedcategoryId === null) {
      console.error("ID de ciudad no válido");
      return;
    }


  
    try {
      
      var data = {
        "amount": $("#amount").val(),
        "code": $("#code").val(),
        "name": $("#name").val(),
        "price": $("#price").val(),
        
        "category": [{
            "id": selectedcategoryId
          }],
        "state": parseInt($("#estate").val())
      };
  
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/product",
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
    $("#name").val("");
    $("#code").val("");
    $("#price ").val("");
  
    $("#category_id").val("");
    
    $("#estate").val("");
    var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
  }


  function loadData() {
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/product",
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
                    <td>` + item.code + `</td>
                    <td>` + item.price + `</td>
                    <td>` + item.amount + `</td>
            
                    <td><ul>` + item.category.reduce((accumulator, currentValue) => accumulator + (`<li>${ currentValue.name }</li>`), '',) + `</ul></td>
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
      url: "http://localhost:9000/service-security/v1/api/product/" + id,
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
    var selectedcategoryId = parseInt($("#selected_category_id").val());
    if (isNaN(selectedcategoryId) || selectedcategoryId === null) {
      console.error("ID de category no valido");
      return;
    }
    // Construir el objeto data
  
    try {
      
        var data = {
            "amount": $("#amount").val(),
            "code": $("#code").val(),
            "name": $("#name").val(),
            "price": $("#price").val(),
            
            "category": [{
                "id": selectedcategoryId
              }],
            "state": parseInt($("#estate").val())
          };
  
      
      var id = $("#id").val();
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/product/" + id,
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
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/product/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        var data=response.data;
        console.log(data);
        $("#id").val(data.id);
        $("#code").val(data.code);
        $('#name').val(data.name);
        $('#price ').val(data.price);
        $('#amount').val(data.amount);
    
        $('#name').val(data.name);

        $("#selected_category_id").val(data.category[0].id);
        $("#category_id").val(data.category[0].name);

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


  function loadCategory() {
    console.log("ejecutando loadcategory");
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/category",
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response.status && Array.isArray(response.data)) {
          var cities = response.data.map(function (category) {
            return {
              label: category.name,
              value: category.id // Agrega el ID como valor
            };
          });
  
          // Inicializar el autocompletado en el campo de entrada de texto
          $("#category_id").autocomplete({
            source: cities,
            select: function (event, ui) {
              // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
              $("#selected_category_id").val(ui.item.value);
              // Actualiza el valor del campo de entrada con el nombre de la persona seleccionada
              $("#category_id").val(ui.item.label);
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
