package com.medicina.medicina.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.medicina.medicina.Entity.Medicos;
import com.medicina.medicina.Service.ServiceMedico;

public class ControllerMedico  {

	@Autowired
	private ServiceMedico service;
	
//	@Operation(summary = "Obtener todos los usuarios", responses = {
//            @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida"),
//            @ApiResponse(responseCode = "404", description = "No se encontraron usuarios")
//    })
    @GetMapping
    public List<Medicos> all() throws Exception{
        return service.all();
    }

//    @Operation(summary = "Obtener un usuario por ID", responses = {
//            @ApiResponse(responseCode = "200", description = "Medicos encontrado"),
//            @ApiResponse(responseCode = "404", description = "Medicos no encontrado")
//    })
    @GetMapping("{id}")
    public Optional<Medicos> show(@PathVariable Long id) throws Exception{
        return service.findById(id);
    }

//    @Operation(summary = "Crear un nuevo usuario", responses = {
//            @ApiResponse(responseCode = "201", description = "Usuario creado")
//    })
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Medicos save(@RequestBody Medicos Medicos) throws Exception{
        return service.save(Medicos);
    }

//    @Operation(summary = "Actualizar un usuario existente", responses = {
//            @ApiResponse(responseCode = "200", description = "Medicos actualizado"),
//            @ApiResponse(responseCode = "404", description = "Medicos no encontrado")
//    })
//    @PutMapping("{id}")
//    @ResponseStatus(code = HttpStatus.CREATED)
//    public ResponseEntity<ApiResponseDto<Medicos>> update(@PathVariable Long id, @RequestBody Medicos Medicos) {
//        try {
//            service.update(id, Medicos);
//            return ResponseEntity.ok(new ApiResponseDto<Medicos>("Datos actualizados", null, true));
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError().body(new ApiResponseDto<Medicos>(e.getMessage(), null, false));
//        }
//    }

    @DeleteMapping("{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) throws Exception{
        service.delete(id);
    }
    
    
	
	
}
