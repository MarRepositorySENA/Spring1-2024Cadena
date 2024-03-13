package com.medicina.medicina.Controller;

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
import com.medicina.medicina.Entity.Ingreso;
import com.medicina.medicina.IService.IIngresoService;

@RequestMapping ("/api/v1/medicina/ingresos")
@RestController
@CrossOrigin
public class IngresoController {
	
	@Autowired
	private IIngresoService service;
	
	@PostMapping("/")
    public Ingreso save(@RequestBody Ingreso ingreso) throws Exception{
        return service.save(ingreso);
    }
	
	@GetMapping ("/")
	public ResponseEntity<Object> findAll(){
		var ListarIngresos = service.all();
		return new ResponseEntity<>(ListarIngresos, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity <Object> findById (@PathVariable Long id){
		var ingreso = service.findById(id);
		return new ResponseEntity<>(ingreso, HttpStatus.OK);
	}
	
	
	@PutMapping("{id}")
    public ResponseEntity<ApiResponseDto<Ingreso>> update(@PathVariable Long id, @RequestBody Ingreso ingreso) {
        try {
            service.update(id, ingreso);
            return ResponseEntity.ok(new ApiResponseDto<Ingreso>("Datos actualizados", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<Ingreso>(e.getMessage(), null, false));
        }
    }
	
	@DeleteMapping ("/{id}") 
	public ResponseEntity<Object> delete (@PathVariable Long id){
		service.delete(id);
		return new ResponseEntity<> ("Registro Eliminado", HttpStatus.OK);
	}
	
	
	
}


	
