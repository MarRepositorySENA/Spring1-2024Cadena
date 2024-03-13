package com.medicina.medicina.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicina.medicina.Config.GlobalConstants;
import com.medicina.medicina.Entity.Paciente;

import com.medicina.medicina.IRepository.IPacienteRepository;
import com.medicina.medicina.IService.IPacienteService;

@Service
public class PacienteService  implements IPacienteService{

	@Autowired
	private IPacienteRepository repository;
	
	
	@Override
	public List<Paciente> all() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Optional<Paciente> findById(Long id) {
		// TODO Auto-generated method stub
		return repository.findById(id);
	}

	@Override
	public Paciente save(Paciente Pacientes) {
		// TODO Auto-generated method stub
		return repository.save(Pacientes);
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
	}

	@Override
	public void update(Long id, Paciente Pacientes) throws Exception {
		Optional<Paciente> optionalPaciente = this.repository.findById(id);

        if (optionalPaciente.isEmpty()) {
            throw new Exception("No se encontró registro");
        }

        Paciente PacienteToUpdate = optionalPaciente.get();
        BeanUtils.copyProperties(Pacientes, PacienteToUpdate, GlobalConstants.EXCLUDED_FIELDS.toArray(new String[0]));

        this.repository.save(PacienteToUpdate);
		
	}

	@Override
	public List<Paciente> findByEstadoTrue() {
		// TODO Auto-generated method stub
		return repository.findByEstadoTrue();
	}


}
