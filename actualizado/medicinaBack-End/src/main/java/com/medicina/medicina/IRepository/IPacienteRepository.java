package com.medicina.medicina.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medicina.medicina.Entity.Paciente;

public interface IPacienteRepository extends JpaRepository<Paciente, Long>{

	 @Query(value = "SELECT * FROM pacientes m WHERE m.estado = true", nativeQuery = true)
	 List<Paciente> findByEstadoTrue();
	
}
