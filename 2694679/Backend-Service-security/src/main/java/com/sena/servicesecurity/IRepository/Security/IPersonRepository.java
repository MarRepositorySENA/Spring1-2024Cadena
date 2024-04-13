package com.sena.servicesecurity.IRepository.Security;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sena.servicesecurity.DTO.IPersonDto;
import com.sena.servicesecurity.DTO.SecurityDto.IPerson2Dto;
import com.sena.servicesecurity.DTO.SecurityDto.IValidationDto;
import com.sena.servicesecurity.Entity.Security.Person;
import com.sena.servicesecurity.IRepository.IBaseRepository;

import lombok.val;


@Repository
public interface IPersonRepository extends IBaseRepository<Person, Long>{


		@Query(value = " SELECT  "
				+ " id, "
				+ " concat(first_name,'  ',last_name) as person "
				+ "	FROM  "
				+ "	person "
				+ "	WHERE  "
				+ " deleted_at IS NULL", nativeQuery = true)
		List<IPersonDto> getList();
		
		@Query(value = " SELECT  "
				+ " id, "
				+ " concat(first_name,'  ',last_name) as person "
				+ "	FROM  "
				+ "	person "
				+ "	WHERE  "
				+ " deleted_at IS NULL", nativeQuery = true)
		List<Object[]> getDList();
		
	
			@Query( value = "SELECT\r\n"
					+ "    p.id,\r\n"
					+ "    p.state,\r\n"
					
					+ "    p.document,\r\n"
					+ "    p.first_name AS firstName,\r\n"
					+ "    p.last_name AS lastName\r\n"
					+ "FROM\r\n"
					+ "    person p\r\n"
					+ "LEFT JOIN\r\n"
					+ "    customer c ON p.id = c.person_id\r\n"
					+ "WHERE\r\n"
					+ "    c.person_id IS NULL and type_document = :TypeDocument ", nativeQuery = true)
		List<IPerson2Dto> getDocumentByType(@Param("TypeDocument") String TypeDocument);
			
			
	
			@Query(value = "SELECT p.id, " 
					+ "    p.id,\r\n"
					+ "    p.state,\r\n"
					+ "    p.document,\r\n"
					+ "    p.first_name AS firstName,\r\n"
					+ "    p.last_name AS lastName\r\n" // Asegúrate de tener un espacio después de 'person'
					+ "FROM person AS p " 
					+ "WHERE p.document = :document ", nativeQuery = true)
				List<IValidationDto> getValidationD( @Param("document") String email);
			
			@Query(value = "SELECT p.id, " 
					+ "    p.id,\r\n"
					+ "    p.state,\r\n"
					+ "    p.document,\r\n"
					+ "    p.first_name AS firstName,\r\n"
					+ "    p.last_name AS lastName\r\n" // Asegúrate de tener un espacio después de 'person'
					+ "FROM person AS p " 
					+ "WHERE  p.email = :email", nativeQuery = true)
				List<IValidationDto> getValidationE( @Param("email") String email);
			
}
