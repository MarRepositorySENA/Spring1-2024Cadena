package com.sena.servicesecurity.Controller.Parameter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.sena.servicesecurity.IService.Parameter.IEnumService;
import com.sena.servicesecurity.Utils.Days;
import com.sena.servicesecurity.Utils.Gender;
import com.sena.servicesecurity.Utils.Mons;
import com.sena.servicesecurity.Utils.Nomenclature;
import com.sena.servicesecurity.Utils.TypeDocument;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/Enum")
public class EnumController {
	@Autowired
	IEnumService service;
	

	@GetMapping("/mons")
	public Mons[] getMons() {
		// TODO Auto-generated method stub
		return service.getMons();
	}

	@GetMapping("/day")
	public Days[] getDays() {
		// TODO Auto-generated method stub
		return service.getDays();
	}

	@GetMapping("/TypeDocument")
	public TypeDocument[] getTypeDocuments() {
		// TODO Auto-generated method stub
		return service.getTypeDocuments();
	}

	@GetMapping("/Nomenclature")
	public Nomenclature[] getDirections() {
		// TODO Auto-generated method stub
		return service.getDirections();
	}
	
	@GetMapping("/gender")
	public Gender[] getGender() {
		
		return service.getGender();

	}
}
