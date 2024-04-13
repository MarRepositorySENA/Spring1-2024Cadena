


function save() {

    var selectedcustomerId = parseInt($("#selected_customer_id").val());
    if (isNaN(selectedcustomerId) || selectedcustomerId === null) {
      console.error("ID de customer no válido");
      return;
    }
  
    try {
      
      var data = {
        "code": $("#code").val(),
        "date": $("#date").val(),
        "totalValue": $("#totalValue").val(),
        
        "customer": {
            "id": selectedcustomerId
          },
        "state": parseInt($("#state").val())
      };
  
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/bill",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: jsonData,
        success: function(data) {
          // alert("Registro agregado con éxito");
          clearData();
          loadData();


          var state = data.data.state;
          var id = data.data.id;

          saveDetails(id,state);
          
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

  function saveDetails(id, state) {
    console.log(id, state); // Verifica que id y state tengan valores válidos
    var selectedProductId = parseInt($("#selected_product_id").val());
    if (isNaN(selectedProductId) || selectedProductId === null) {
      console.error("ID de Producto no válido");
      return;
    }
  
    try {
      var data = {
        "payValue": $("#payValue").val(),
        "amount": $("#amount").val(),
        "bill": {
          "id": id
        },
        "product": {
          "id": selectedProductId
        },
        "state": state
      };
      console.log(data); // Verifica la estructura correcta del objeto data
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/billDetails",
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

          var id = data.data.id;
          loadDataAndGeneratePDF(id);
        
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
  
    $("#customer_id").val("");
    
    $("#state").val("");
    var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
  }


  function loadData() {
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/billDetails",
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
                    <td>${item.bill.customer.person.firstName}</td>
                    <td>` + item.bill.date + `</td>
                    <td>` + item.bill.code + `</td>
                    <td>` + item.product.name + `</td>
                    <td>` + item.amount + `</td>
                    <td>` + item.payValue + `</td>
                    <td>` + item.bill.totalValue + `</td>
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
      url: "http://localhost:9000/service-security/v1/api/billDetails/" + id,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).done(function (result) {
      Swal.fire({
        title: "Perfect!",
        text: "Registration successfully delet",
        icon: "success",
        timer: 2000, 
        buttons: false 
    })
      loadData();
    });
  }


  function updateBill() {
    var selectedcustomerId = parseInt($("#selected_customer_id").val());
    if (isNaN(selectedcustomerId) || selectedcustomerId === null) {
      console.error("ID de customer no valido");
      return;
    }
    // Construir el objeto data
  
    try {
      
      var data = {
        "code": $("#code").val(),
        "date": $("#date").val(),
        "totalValue": $("#totalValue").val(),
        
        "customer": {
            "id": selectedcustomerId
          },
        "state": parseInt($("#state").val())
      };
      
      var id = $("#id_bill").val();
      var jsonData = JSON.stringify(data);
      $.ajax({
        url: "http://localhost:9000/service-security/v1/api/bill/" + id,
        data: jsonData,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }).done(function (result) {
        // alert("Registro actualizado con éxito");
      
        loadData();
        clearData();
        updateDetails()
    
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
  function update(idBill,state){
    updateBill();
    updateDetails(idBill,state);
  }


  function updateDetails(idBill,state){

        var selectedProductId = parseInt($("#selected_product_id").val());
        if (isNaN(selectedProductId) || selectedProductId === null) {
          console.error("ID de Producto no válido");
          return;
        }
  try{ 
          var data = {
            "payValue": $("#payValue").val(),
            "amount": $("#amount").val(),
            "bill": {
              "id": idBill
            },
            "product": {
              "id": selectedProductId
            },
            "state": state
          };

  
      
    var id = $("#id_details").val();
    var jsonData = JSON.stringify(data);
              $.ajax({
                url: "http://localhost:9000/service-security/v1/api/billDetails/" + id,
                data: jsonData,
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
              }).done(function (result) {
               
                  loadData();
                  clearData();
                  Swal.fire({
                    title: "Perfect!",
                    text: "Registration successfully updated",
                    icon: "success",
                    timer: 2000, 
                    buttons: false 
                })
                 
              
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
    console.log("data de func" +id);
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/billDetails/" + id,
      method: "GET",
      dataType: "json",
      success: function (response) {
        var data=response.data;
        console.log(data);
        $("#id_bill").val(data.bill.id);
        $("#id_details").val(data.id);
        $('#code').val(data.bill.code);
        $('#date ').val(data.bill.date);
        $('#totalValue').val(data.bill.totalValue);
        $("#selected_customer_id").val(data.bill.customer.id);
        $("#customer_id").val(data.bill.customer.person.firstName );
        $('#payValue ').val(data.payValue);
        $('#amount ').val(data.amount);
        $('#date ').val(data.bill.date);
        $('#date ').val(data.bill.date);

        $("#selected_product_id").val(data.product.id);
        $("#product_id").val(data.product.name );
      
        $("#state").val(data.state == true ? 1 : 0);

        var state =data.state == true;
        var idBill = data.bill.id;
  
        //Cambiar boton.
        var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Actualizar");
        btnAgregar.attr("onclick", `update(${idBill},${state}) `);

      },
      error: function (error) {
        // Función que se ejecuta si hay un error en la solicitud
        console.error("Error en la solicitud:", error);
      },
    });

     
  }

  
  
  function loadCustomer() {
    console.log("ejecutando loadcustomer");
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/customer",
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response.status && Array.isArray(response.data)) {
          var cities = response.data.map(function (customer) {
            return {
              label: customer.person.firstName,
              value: customer.id // Agrega el ID como valor
            };
          });
  
          // Inicializar el autocompletado en el campo de entrada de texto
          $("#customer_id").autocomplete({
            source: cities,
            select: function (event, ui) {
              // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
              $("#selected_customer_id").val(ui.item.value);
              // Actualiza el valor del campo de entrada con el nombre de la persona seleccionada
              $("#customer_id").val(ui.item.label);
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


  function loadProduct() {
    console.log("Ejecutando loadProduct");
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/product",
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response.status && Array.isArray(response.data)) {
          var products = response.data.map(function (product) {
            return {
              label: product.name,
              value: product.id, // Agrega el ID como valor
              price: product.price // Agrega el precio como propiedad del objeto
            };
          });
  
          // Inicializar el autocompletado en el campo de entrada de texto
          $("#product_id").autocomplete({
            source: products,
            select: function (event, ui) {
              // Al seleccionar un elemento del autocompletado, guarda el ID y el precio en campos ocultos
              $("#selected_product_id").val(ui.item.value);
              $("#payValue").val(ui.item.price); // Actualiza el valor de payValue con el precio del producto
              // Actualiza el valor del campo de entrada con el nombre del producto seleccionado
              $("#product_id").val(ui.item.label);
              console.log("ID de producto seleccionado: " + ui.item.value);
              console.log("Precio del producto: " + ui.item.price);
              return false; // Evita la propagación del evento y el formulario de envío
            }
          });
        } else {
          console.error("Error: No se pudo obtener la lista de productos.");
        }
      },
      error: function (error) {
        // Función que se ejecuta si hay un error en la solicitud
        console.error("Error en la solicitud:", error);
      },
    });
  }
  

  async function loadDataAndGeneratePDF(id) {
    $.ajax({
      url: "http://localhost:9000/service-security/v1/api/billDetails/" + id,
      method: "GET",
      dataType: "json",
      success: async function (response) {
        try {
          console.log(response.data);
          var data = [response.data]; // Convertir el objeto de respuesta en un array de un solo elemento
          if (data.length > 0) {
            await generatePDF(data); // Esperar la generación del PDF
          } else {
            console.error("No se encontraron datos válidos para generar el PDF.");
          }
        } catch (error) {
          console.error("Error en la generación del PDF:", error);
        }
      },
      error: function (error) {
        console.error("Error en la solicitud:", error);
      },
    });
  }
  
  async function generatePDF(data) {
    // Crear un nuevo documento PDF
    const { PDFDocument, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Definir el contenido del PDF
    const headers = ["Customer Name", "Date", "Code", "Product Name", "Amount", "Pay Value", "Total Value", "State"];
    const tableData = data.map(item => [
        item.bill.customer.person.firstName.toString(),
        item.bill.date.toString(),
        item.bill.code.toString(),
        item.product.name.toString(),
        item.amount.toString(),
        item.payValue.toString(),
        item.bill.totalValue.toString(),
        item.state ? "Activo" : "Inactivo"
    ]);

    // Calcular la altura de cada fila y el ancho de cada columna
    const rowHeight = 20;
    const colWidth = 100;

    // Definir la posición inicial de la tabla
    let x = 50;
    let y = 700;

    // Agregar el encabezado de la factura
    page.drawText("Factura", { x: 200, y: 770, size: 20 });
    y -= rowHeight;

    // Agregar los detalles de la factura
    page.drawText("Detalles del Cliente:", { x, y });
    y -= rowHeight;
    page.drawText(`Nombre del Cliente: ${data[0].bill.customer.person.firstName}`, { x, y });
    y -= rowHeight;
    page.drawText(`Fecha: ${data[0].bill.date}`, { x, y });
    y -= rowHeight;
    page.drawText(`Código de Factura: ${data[0].bill.code}`, { x, y });
    y -= rowHeight;

    page.drawText(`Nombre del Producto: ${data[0].product.name}`, { x, y });
    y -= rowHeight;

    page.drawText(`Valor del Producto: ${data[0].payValue}`, { x, y });
    y -= rowHeight;
    page.drawText(`Valor Total: ${data[0].bill.totalValue}`, { x, y });
    y -= rowHeight;

    // // Agregar los detalles de los productos
    // page.drawText("Detalles de los Productos:", { x, y });
    // y -= rowHeight;

    // Agregar la tabla de datos
    // tableData.forEach(row => {
    //     row.forEach((cell, index) => {
    //         page.drawText(cell, { x: x + colWidth * index, y });
    //     });
    //     y -= rowHeight;
    // });

    // Convertir el documento PDF a un blob para su descarga
    const pdfBytes = await pdfDoc.save();

    // Descargar el PDF al hacer clic en un botón
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Factura.pdf";
    link.click();
}
