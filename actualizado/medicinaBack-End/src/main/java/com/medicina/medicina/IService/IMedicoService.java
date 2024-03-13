package com.medicina.medicina.IService;

import java.util.List;
import java.util.Optional;

import com.medicina.medicina.Entity.Medico;

public interface IMedicoService {

	
	public List<Medico> all();

	public Optional<Medico> findById(Long id);

	public Medico save(Medico Medicos);
	
	public void update(Long id, Medico Medicos) throws Exception;

	public void delete(Long id);
	
	public List<Medico> findByEstadoTrue();


	// List<Medicos> findByEstado(String estado);

	/*public interface IMedicoService {
	    List<Medico> obtenerTodosMedicos();
	    Medico obtenerMedicoPorId(Long id);
	    void crearMedico(Medico medico);
	    void actualizarMedico(Long id, Medico medico);
	    void eliminarMedico(Long id);
	}*/
	
}
