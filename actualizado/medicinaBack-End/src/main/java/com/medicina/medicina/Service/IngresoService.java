package com.medicina.medicina.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicina.medicina.Config.GlobalConstants;
import com.medicina.medicina.Entity.Ingreso;
import com.medicina.medicina.IRepository.IIngresoRepository;
import com.medicina.medicina.IService.IIngresoService;


@Service
public class IngresoService implements IIngresoService {
	
	@Autowired 
	private IIngresoRepository repository;
	

	@Override
	public List<Ingreso> all() {
		return repository.findAll();
	}

	@Override
	public Optional<Ingreso> findById(Long id) {
		return repository.findById(id);
	
	}

	@Override
	public Ingreso save(Ingreso Ingresos) {
		return repository.save(Ingresos);
	}

	@Override
	public void delete(Long id) {
		repository.deleteById(id);
		
	}

	@Override
	public void update(Long id, Ingreso ingreso)throws Exception {
		Optional<Ingreso> optionalIngreso = this.repository.findById(id);

        if (optionalIngreso.isEmpty()) {
            throw new Exception("No se encontró registro");
        }

        Ingreso ingresoToUpdate = optionalIngreso.get();
        BeanUtils.copyProperties(ingreso, ingresoToUpdate, GlobalConstants.EXCLUDED_FIELDS.toArray(new String[0]));

        this.repository.save(ingresoToUpdate);
		
	}


	

}
