package com.medicina.medicina.Entity;

import com.medicina.medicina.Entity.Herencia.DatosBasicos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="paciente")
public class Pacientes extends DatosBasicos{

	@Id
	@Column(name = "id", nullable = false, length = 36)
	private Long Id;
	
	@Column (name ="nombre_persona_contacto", nullable=false)
	private String NombrePersonaContacto;
	
}