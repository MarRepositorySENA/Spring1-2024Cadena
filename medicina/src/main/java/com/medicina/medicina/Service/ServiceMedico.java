package com.medicina.medicina.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicina.medicina.Entity.Medicos;
import com.medicina.medicina.IRepository.IRepositoryMedico;
import com.medicina.medicina.IService.IMedicoService;

@Service
public class ServiceMedico implements IMedicoService{

	@Autowired
	private IRepositoryMedico repository;

	@Override
	public List<Medicos> all() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Optional<Medicos> findById(Long id) {
		// TODO Auto-generated method stub
		return repository.findById(id);
	}

	@Override
	public Medicos save(Medicos Medicos) {
		// TODO Auto-generated method stub
		return repository.save(Medicos);
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
	}

	/*
	  @Override
	 
	public List<Medicos> findByEstado(String estado) {
		// TODO Auto-generated method stub
		return null;
	}
	*/

	

	
	


	
}
