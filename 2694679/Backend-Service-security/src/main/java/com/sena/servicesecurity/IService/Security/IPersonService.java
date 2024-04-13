package com.sena.servicesecurity.IService.Security;

import java.util.List;


import com.sena.servicesecurity.DTO.IPersonDto;
import com.sena.servicesecurity.DTO.SecurityDto.IPerson2Dto;
import com.sena.servicesecurity.DTO.SecurityDto.IValidationDto;
import com.sena.servicesecurity.Entity.Operational.Customer;
import com.sena.servicesecurity.Entity.Security.Person;
import com.sena.servicesecurity.IService.IBaseService;

public interface IPersonService extends IBaseService<Person>{
	
	List<IPersonDto> getList();
	List<IPerson2Dto> getDocumentByType(String TypeDocument) throws Exception;
	//public Customer savePersonCustomer(Person entity) throws Exception; 
	
	List<IValidationDto> getValidationE(String email) throws Exception;
	
	List<IValidationDto> getValidationD(String document) throws Exception;

	

}
  