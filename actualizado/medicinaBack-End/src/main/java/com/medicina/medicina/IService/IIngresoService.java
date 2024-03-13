package com.medicina.medicina.IService;

import java.util.List;
import java.util.Optional;

import com.medicina.medicina.Entity.Ingreso;

public interface IIngresoService {
	
	
	public List <Ingreso> all();
	public Optional <Ingreso> findById(Long id);
	public Ingreso save (Ingreso Ingresos);
	public void update (Long id, Ingreso ingreso) throws Exception;
	public void delete (Long id);
	

}
