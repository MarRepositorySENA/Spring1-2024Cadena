package com.medicina.medicina.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicina.medicina.Config.GlobalConstants;
import com.medicina.medicina.Entity.Medico;
import com.medicina.medicina.IRepository.IMedicoRepository;
import com.medicina.medicina.IService.IMedicoService;

@Service
public class MedicoService implements IMedicoService{

	@Autowired
	private IMedicoRepository repository;

	@Override
	public List<Medico> all() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Optional<Medico> findById(Long id) {
		// TODO Auto-generated method stub
		return repository.findById(id);
	}

	@Override
	public Medico save(Medico Medicos) {
		// TODO Auto-generated method stub
		return repository.save(Medicos);
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
	}

	@Override
	public void update(Long id, Medico Medicos) throws Exception {
		Optional<Medico> optionalMedico = this.repository.findById(id);

        if (optionalMedico.isEmpty()) {
            throw new Exception("No se encontró registro");
        }

        Medico medicoToUpdate = optionalMedico.get();
        BeanUtils.copyProperties(Medicos, medicoToUpdate, GlobalConstants.EXCLUDED_FIELDS.toArray(new String[0]));

        this.repository.save(medicoToUpdate);
		
	}

	@Override
	public List<Medico> findByEstadoTrue() {
	
		return repository.findByEstadoTrue();
	}



	

	
	


	
}
