package com.medicina.medicina.Entity;

import com.medicina.medicina.Entity.Herencia.DatosBasicos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table (name="pacientes")
public class Paciente extends DatosBasicos{
	

	@Column (name= "nombre_persona_contacto", nullable=false, length = 35)
	private String NombrePersonaContacto;
	
	@Column (name="telefono_persona_contacto", nullable=false, length = 35)
	private String TelefonoPersonaContacto;

	
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