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
import com.medicina.medicina.Entity.Medico;
import com.medicina.medicina.IService.IMedicoService;

@RequestMapping ("/api/v1/medicina/medicos")
@RestController
@CrossOrigin
public class MedicoController {

	@Autowired
	private IMedicoService service;
	 
	@PostMapping("/")
    public Medico save(@RequestBody Medico medico) throws Exception{
        return service.save(medico);
    }
	
	@GetMapping("/")
	public ResponseEntity<Object> findAll(){
		var ListarMedicos = service.all();		return new ResponseEntity<>(ListarMedicos, HttpStatus.OK);		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findById(@PathVariable Long id){
		var medico = service.findById(id);
		return new ResponseEntity<>(medico, HttpStatus.OK);
	}
	
	@PutMapping("{id}")
    public ResponseEntity<ApiResponseDto<Medico>> update(@PathVariable Long id, @RequestBody Medico medico) {
        try {
            service.update(id, medico);
            return ResponseEntity.ok(new ApiResponseDto<Medico>("Datos actualizados", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<Medico>(e.getMessage(), null, false));
        }
    }
	
	
	
	
	@DeleteMapping ("/{id}")
	public ResponseEntity<Object> delete (@PathVariable Long id){
		service.delete(id);
		return new ResponseEntity<>("Registro Eliminado", HttpStatus.OK);
	}
	
	@GetMapping ("/findByTrue")
	public List<Medico> findByEstadoTrue(){
		return service.findByEstadoTrue();
	}
	
}
