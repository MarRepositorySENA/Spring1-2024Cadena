package com.medicina.medicina.IService;

import java.util.List;
import java.util.Optional;

import com.medicina.medicina.Entity.Paciente;




public interface IPacienteService {

	public List < Paciente > all();
	public Optional<Paciente> findById (Long id);
	public Paciente save (Paciente Pacientes);
	public void update (Long id, Paciente Pacientes) throws Exception;
	public void delete (Long id);
	public List<Paciente> findByEstadoTrue();
	
	
}
