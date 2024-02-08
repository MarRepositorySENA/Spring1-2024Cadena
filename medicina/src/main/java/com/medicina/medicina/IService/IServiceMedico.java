package com.medicina.medicina.IService;

import java.util.List;
import java.util.Optional;

import com.medicina.medicina.Entity.Medicos;

public interface IServiceMedico {

	public List<Medicos> all();

	public Optional<Medicos> findById(Long id);

	public Medicos save(Medicos Medicos);

	public void delete(Long id);
	
	List<Medicos> encontrarVerdaderos();

}
