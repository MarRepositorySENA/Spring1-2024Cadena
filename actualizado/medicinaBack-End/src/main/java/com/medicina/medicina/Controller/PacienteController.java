package com.medicina.medicina.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicina.medicina.Config.ApiResponseDto;
import com.medicina.medicina.Entity.Paciente;
import com.medicina.medicina.IService.IPacienteService;


@RequestMapping ("/api/v1/medicina/pacientes")
@RestController
@CrossOrigin
//Anotacion: permite utilizar la configuration de cors

public class PacienteController {
	
	@Autowired
	private IPacienteService service;
	 
	@PostMapping("/")
    public Paciente save(@RequestBody Paciente paciente) throws Exception{
        return service.save(paciente);
    }
	
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var ListarPacientes = service.all();
		return new ResponseEntity<>(ListarPacientes, HttpStatus.OK);		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findById(@PathVariable Long id){
		var paciente = service.findById(id);
		return new ResponseEntity<>(paciente, HttpStatus.OK);
	}
	
	
	@PutMapping("{id}")
    public ResponseEntity<ApiResponseDto<Paciente>> update(@PathVariable Long id, @RequestBody Paciente libro) {
        try {
            service.update(id, libro);
            return ResponseEntity.ok(new ApiResponseDto<Paciente>("Datos actualizados", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<Paciente>(e.getMessage(), null, false));
        }
    }
	
	

	@DeleteMapping ("/{id}")
	public ResponseEntity<Object> delete (@PathVariable Long id){
		service.delete(id);
		return new ResponseEntity<>("Registro Eliminado", HttpStatus.OK);
		
	
	}

	@GetMapping ("/findByTrue")
	public List<Paciente> findByEstadoTrue(){
		return service.findByEstadoTrue();
	}
}
