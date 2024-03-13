package com.medicina.medicina.IRepository;





import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medicina.medicina.Entity.Medico;

public interface IMedicoRepository extends JpaRepository<Medico, Long>{

	
	 @Query(value = "SELECT * FROM medico m WHERE m.estado = true", nativeQuery = true)
	 List<Medico> findByEstadoTrue();
	

}
