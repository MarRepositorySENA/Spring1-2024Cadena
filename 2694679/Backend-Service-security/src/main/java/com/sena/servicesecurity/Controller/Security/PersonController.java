package com.sena.servicesecurity.Controller.Security;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sena.servicesecurity.Controller.ABaseController;
import com.sena.servicesecurity.DTO.ApiResponseDto;
import com.sena.servicesecurity.DTO.IPersonDto;
import com.sena.servicesecurity.DTO.IUserDto;
import com.sena.servicesecurity.DTO.SecurityDto.IPerson2Dto;
import com.sena.servicesecurity.Entity.Operational.Customer;
import com.sena.servicesecurity.Entity.Security.Person;
import com.sena.servicesecurity.IService.Security.IPersonService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/person")
public class PersonController extends ABaseController<Person,IPersonService>{
	public PersonController(IPersonService service) {
        super(service, "Person");
        
    }
	@GetMapping("/list")
    public ResponseEntity<ApiResponseDto<List<IPersonDto>>> show() {
        try {
            List<IPersonDto> entity = service.getList();
            return ResponseEntity.ok(new ApiResponseDto<List<IPersonDto>>("Registro encontrado", entity, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<List<IPersonDto>>(e.getMessage(), null, false));
        }
		}
	
	
	
	  @GetMapping("/string/{TypeDocument}")
	    public ResponseEntity<ApiResponseDto<List<IPerson2Dto>>> show(@PathVariable String TypeDocument) {
	        try {
	            List<IPerson2Dto> entity = service.getDocumentByType(TypeDocument);
	            return ResponseEntity.ok(new ApiResponseDto<List<IPerson2Dto>>("Registro encontrado", entity, true));
	        } catch (Exception e) {
	            return ResponseEntity.internalServerError().body(new ApiResponseDto<List<IPerson2Dto>>(e.getMessage(), null, false));
	        }
	    }
	  
	  
	  
	  
	  
	  
	

}
	



