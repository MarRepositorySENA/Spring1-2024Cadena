package com.sena.servicesecurity.IService.Operational;

import com.sena.servicesecurity.Entity.Operational.Customer;
import com.sena.servicesecurity.Entity.Security.Person;
import com.sena.servicesecurity.IService.IBaseService;

public interface ICustomerService extends IBaseService<Customer> {


	//public String GenerateCodeCustomer(long idPerson) throws Exception ;
	
	public void update(Long id, Customer entity) throws Exception;

	public Customer savePersonCustomer(Person entity) throws Exception;
	
	//
	 
	String GenerateCodeCustomer(long idPerson, String typeDocument, String document)
			throws Exception;

	//void updateCusPerson(Long id_person, long Idcustomer, Person entity) throws Exception;

	void updateCusPerson(Long Idcustomer, Person entity) throws Exception;

	Customer findByPersonId(long person_id) throws	Exception;

	void updatePerson(Long id_person, Person entity) throws Exception;
}
