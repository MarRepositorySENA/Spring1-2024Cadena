package com.medicina.medicina.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicina.medicina.Entity.Medicos;

public interface IRepositoryMedico extends JpaRepository<Medicos, Long>{
	
	@Query(value = "select * from medicos where estado = true")
	List<Medicos> encontrarVerdaderos();

}
