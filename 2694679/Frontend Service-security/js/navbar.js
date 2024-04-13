document.addEventListener('DOMContentLoaded', function() {

    // Obtener los datos del usuario almacenados en localStorage
    var userData = JSON.parse(localStorage.getItem('userData'));
    
    function loadContent(viewRoute) {
        var contentFrame = document.getElementById('contentFrame');
        contentFrame.src = viewRoute;
        console.log("Ruta de la vista cargada: " + viewRoute);
    }
    
    
    // Verificar si se han encontrado datos de usuario y si hay al menos un módulo
    if (userData &&  userData.modules && userData.modules.length > 0) {
      
        var sidebar = document.getElementById('accordionSidebar');
    
        // Obtener el elemento <span> dentro del dropdown
        var spanElement = document.querySelector('#userDropdown .d-none.d-lg-inline.text-gray-600.small');
    
        // Verificar si el elemento <span> existe antes de intentar modificarlo
        if (spanElement) {
            // Modificar el texto del elemento <span>
            spanElement.textContent = userData.personName;
        }
    
        console.log(userData.personName);
        // Recorrer cada módulo
        userData.modules.forEach(function(module) {
            // Crear el elemento <li> para el módulo
            var liItem = document.createElement('li');
            liItem.classList.add('nav-item');
    
            // Crear el enlace principal del módulo
            var aLink = document.createElement('a');
            aLink.classList.add('nav-link', 'collapsed');
            aLink.href = '#';
            aLink.setAttribute('data-toggle', 'collapse');
            aLink.setAttribute('data-target', '#collapse_' + module.module.replace(/ /g, '_'));
            aLink.setAttribute('aria-expanded', 'true');
            aLink.setAttribute('aria-controls', 'collapse_' + module.module.replace(/ /g, '_'));
    
            // Crear el texto del módulo
            var spanText = document.createElement('span');
            spanText.textContent = module.module;
    
            // Crear el icono del módulo basado en el nombre del módulo
            var icon = document.createElement('i');
    
            icon.classList.add('fas', 'fa-fw');
            if (module.module.toLowerCase() === 'parameter') {
                icon.classList.add('fa-folder');
            } else if (module.module.toLowerCase() === 'security') {
                icon.classList.add('fa-wrench');
            } else if (module.module.toLowerCase() === 'operational') {
                icon.classList.add('fa-cog');
            }
    
            // Agregar el icono y el texto al enlace principal
            aLink.appendChild(icon);
            aLink.appendChild(spanText);
    
            // Agregar el enlace principal al elemento <li>
            liItem.appendChild(aLink);
    
            // Crear el div para el submenu colapsable
            var collapseDiv = document.createElement('div');
            collapseDiv.id = 'collapse_' + module.module.replace(/ /g, '_');
            collapseDiv.classList.add('collapse');
            collapseDiv.setAttribute('aria-labelledby', 'heading_' + module.module.replace(/ /g, '_'));
            collapseDiv.setAttribute('data-parent', '#accordionSidebar');
    
            // Crear el div interno para el submenu
            var innerDiv = document.createElement('div');
            innerDiv.classList.add('bg-white', 'py-2', 'collapse-inner', 'rounded');
    
            // Agregar el encabezado del submenu
            var heading = document.createElement('h6');
            heading.classList.add('collapse-header');
            heading.textContent = 'Options:';
    
            // Agregar el encabezado al div interno
            innerDiv.appendChild(heading);
    
            // Verificar si el módulo tiene vistas asociadas y agregarlas al submenu
            if (module.viewName && module.viewRoute) {
                var viewNames = module.viewName.replace(/[\[\]"]+/g, '').split(',');
                var viewRoutes = JSON.parse(module.viewRoute);
    
                for (var i = 0; i < viewNames.length; i++) {
                    var viewName = viewNames[i].trim();
                    var viewRoute = viewRoutes[i].trim();
    
                    var viewLink = document.createElement('a');
                    viewLink.classList.add('collapse-item');
                    //viewLink.href = viewRoute;
                    viewLink.textContent = viewName;
    
                    (function(route) {
                        // Asignar la función loadContent al evento onclick con la ruta de la vista como argumento
                        viewLink.addEventListener('click', function() {
                            loadContent(route); // Pasar la ruta de la vista como argumento
                            console.log("Ruta de la vista cargada: " + route);
                        });
                    })(viewRoute);
    
                    // Agregar la vista al div interno
                    innerDiv.appendChild(viewLink);
                }
            }
    
            // Agregar el div interno al div del submenu
            collapseDiv.appendChild(innerDiv);
    
            // Agregar el div del submenu al elemento <li>
            liItem.appendChild(collapseDiv);
    
            // Agregar el elemento <li> al sidebar
            sidebar.appendChild(liItem);
        });
    
        // Crear el botón de cerrar sesión
        // var logoutButton = document.createElement('button');
        // logoutButton.classList.add('btn', 'ms-2');
        // logoutButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="red" class="bi bi-person-x" viewBox="0 0 16 16"><path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708"/></svg>';
       
        // logoutButton.addEventListener('click', function() {
        //     // Eliminar los datos del usuario del localStorage
        //     localStorage.removeItem('userData');
      
        //     window.location.href = '/Frontend Service-security/view/Security/login.html';
        // });
        // sidebar.appendChild(logoutButton);
        // Crear el botón de cerrar sesión
    
        
       
    } else {
        console.log("No se encontraron datos de usuario o módulos disponibles.");
        window.location.href = "/Frontend Service-security/404.html";
    }
    
    });
    
    function lagout(){
        localStorage.removeItem('userData');
      
        window.location.href = '/Frontend Service-security/view/Security/login.html';
    }