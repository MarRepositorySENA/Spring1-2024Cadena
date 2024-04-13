package com.sena.servicesecurity.Controller.Operational;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.servicesecurity.Controller.ABaseController;
import com.sena.servicesecurity.Entity.Operational.Category;
import com.sena.servicesecurity.IService.Operational.ICategoryService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/category")
public class CategoryController extends ABaseController<Category, ICategoryService> {

	protected CategoryController(ICategoryService service) {
		super(service, "Category");
		// TODO Auto-generated constructor stub
	}

}
