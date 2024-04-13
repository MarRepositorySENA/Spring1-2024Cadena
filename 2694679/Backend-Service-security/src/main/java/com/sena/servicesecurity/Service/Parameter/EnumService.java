package com.sena.servicesecurity.Service.Parameter;

import java.awt.Image;

import org.springframework.stereotype.Service;

import com.sena.servicesecurity.IService.Parameter.IEnumService;
import com.sena.servicesecurity.Service.ABaseService;
import com.sena.servicesecurity.Utils.Days;
import com.sena.servicesecurity.Utils.Gender;
import com.sena.servicesecurity.Utils.Mons;
import com.sena.servicesecurity.Utils.Nomenclature;
import com.sena.servicesecurity.Utils.TypeDocument;

@Service
public class EnumService implements  IEnumService{

	

	@Override
	public Mons[] getMons() {
		// TODO Auto-generated method stub
		return Mons.values();
	}

	@Override
	public Days[] getDays() {
		// TODO Auto-generated method stub
		return Days.values();
	}

	@Override
	public TypeDocument[] getTypeDocuments() {
		// TODO Auto-generated method stub
		return TypeDocument.values();
	}

	@Override
	public Nomenclature[] getDirections() {
		// TODO Auto-generated method stub
		return Nomenclature.values();
	}
	
	@Override
	public Gender[] getGender() {
		// TODO Auto-generated method stub
		return Gender.values();
	}
}
