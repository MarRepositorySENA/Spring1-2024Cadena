package com.medicina.medicina.Entity;

import com.medicina.medicina.Entity.Herencia.DatosBasicos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name="medicos")
public class Medicos extends DatosBasicos{

	@Id
	@Column(name = "id", nullable = false, length = 36)
	private Long Id;
	
	
	
}
