package com.sena.servicesecurity.Controller.Operational;


import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sena.servicesecurity.Controller.ABaseController;
import com.sena.servicesecurity.DTO.ApiResponseDto;
import com.sena.servicesecurity.Entity.Operational.Product;
import com.sena.servicesecurity.IService.Operational.IProductService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/product")
public class ProductController extends ABaseController<Product, IProductService>{

	protected ProductController(IProductService service) {
		super(service, "Product");
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	  
}
