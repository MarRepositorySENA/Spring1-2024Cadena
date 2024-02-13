package com.medicina.medicina.Entity;

import com.medicina.medicina.Entity.Herencia.DatosBasicos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="paciente")
public class Pacientes extends DatosBasicos{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, length = 36)
	private Long Id;

	@Column (name= "nombre_persona_contacto", nullable=false, length = 35)
	private String NombrePersonaContacto;
	
	@Column (name="telefono_persona_contacto", nullable=false, length = 35)
	private String TelefonoPersonaContacto;

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getNombrePersonaContacto() {
		return NombrePersonaContacto;
	}

	public void setNombrePersonaContacto(String nombrePersonaContacto) {
		NombrePersonaContacto = nombrePersonaContacto;
	}

	public String getTelefonoPersonaContacto() {
		return TelefonoPersonaContacto;
	}

	public void setTelefonoPersonaContacto(String telefonoPersonaContacto) {
		TelefonoPersonaContacto = telefonoPersonaContacto;
	}


	
}