package com.sena.servicesecurity.IRepository.Operational;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sena.servicesecurity.Entity.Operational.Customer;
import com.sena.servicesecurity.IRepository.IBaseRepository;

@Repository
public interface ICustomerRepository extends IBaseRepository<Customer, Long>{

	
	@Query(value = "SELECT\r\n"
			+ "\r\n"
			+ "    \r\n"
			+ "    `person`.`document`,\r\n"
			+ "   \r\n"
			+ "    `person`.`type_document`\r\n"
			+ "   \r\n"
			+ "FROM `service_security`.`person`\r\n"
			+ "where id = :id" , nativeQuery = true)
	
	String getDocument(@Param("id") Long id);
	
	

	@Query(value = "SELECT \r\n"
			
			+ "    `person`.`type_document`\r\n"
			+ "   \r\n"
			+ "FROM `service_security`.`person`\r\n"
			+ "where id = :id" , nativeQuery = true)

	String getDocumentType(@Param("id") Long id);

	@Query (value = "SELECT * FROM  customer WHERE person_id = :person_id ", nativeQuery = true)
	 Customer findByPersonId(@Param("person_id")long person_id);

}
