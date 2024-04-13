package com.sena.servicesecurity.Controller.Operational;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.servicesecurity.Controller.ABaseController;
import com.sena.servicesecurity.DTO.ApiResponseDto;
import com.sena.servicesecurity.Entity.Operational.Customer;
import com.sena.servicesecurity.Entity.Security.Person;
import com.sena.servicesecurity.IService.Operational.ICustomerService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/customer")
public class CustomerController extends ABaseController<Customer,ICustomerService> {

	protected CustomerController(ICustomerService service) {
		super(service, "Customer");
		// TODO Auto-generated constructor stub
	}
	
	@PostMapping("/persoCustomer")
    public ResponseEntity<ApiResponseDto<Customer>> save(@RequestBody Person entity) {
        try {
        	System.out.println(entity.getDocument());
        	System.out.println(entity);
            return ResponseEntity.ok(new ApiResponseDto<Customer>("Datos guardados", service.savePersonCustomer(entity), true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<Customer>(e.getMessage(), null, false));
        }
    }

}
