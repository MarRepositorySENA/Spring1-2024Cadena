package com.medicina.medicina.IService;

import java.util.List;
import java.util.Optional;

import com.medicina.medicina.Entity.Medicos;

public interface IMedicoService {

	
	public List<Medicos> all();

	public Optional<Medicos> findById(Long id);

	public Medicos save(Medicos Medicos);

	public void delete(Long id);


	// List<Medicos> findByEstado(String estado);

	/*public interface IMedicoService {
	    List<Medico> obtenerTodosMedicos();
	    Medico obtenerMedicoPorId(Long id);
	    void crearMedico(Medico medico);
	    void actualizarMedico(Long id, Medico medico);
	    void eliminarMedico(Long id);
	}*/
	
}
