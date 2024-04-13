package com.sena.servicesecurity.IService.Parameter;

import com.sena.servicesecurity.Utils.Days;
import com.sena.servicesecurity.Utils.Gender;
import com.sena.servicesecurity.Utils.Mons;
import com.sena.servicesecurity.Utils.Nomenclature;
import com.sena.servicesecurity.Utils.TypeDocument;

public interface IEnumService {
	Nomenclature[] getDirections();
	
	Mons[] getMons();
	Days[] getDays();
	TypeDocument[] getTypeDocuments();
	Gender[] getGender();
	
	
	
}
