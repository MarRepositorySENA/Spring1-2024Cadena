package com.medicina.medicina.Entity.Herencia;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class DatosBasicos {
	
	@Column(name = "numero_documento", nullable = false, length = 15, unique=true)
	private String NumeroDocumento;

	@Column(name = "primer_nombre", nullable = false, length = 15)
	private String PrimerNombre;

	@Column(name = "segundo_nombre", nullable = true, length = 20)
	private String SegundoNombre;

	@Column(name = "primer_apellido", nullable = false, length = 20)
	private String PrimerApellido;

	@Column(name = "segundo_apellido", nullable = true, length = 20)
	private String SegundoApellido;

	@Column(name = "telefono", nullable = false, length = 15, unique=true)
	private String Telefono;

	@Column(name = "correo", nullable = false, length = 45, unique=true)
	private String Correo;
	
	@Column(name = "estado", nullable = false)
	private Boolean Estado;

	public String getNumeroDocumento() {
		return NumeroDocumento;
	}

	public void setNumeroDocumento(String numeroDocumento) {
		NumeroDocumento = numeroDocumento;
	}

	public String getPrimerNombre() {
		return PrimerNombre;
	}

	public void setPrimerNombre(String primerNombre) {
		PrimerNombre = primerNombre;
	}

	public String getSegundoNombre() {
		return SegundoNombre;
	}

	public void setSegundoNombre(String segundoNombre) {
		SegundoNombre = segundoNombre;
	}

	public String getPrimerApellido() {
		return PrimerApellido;
	}

	public void setPrimerApellido(String primerApellido) {
		PrimerApellido = primerApellido;
	}

	public String getSegundoApellido() {
		return SegundoApellido;
	}

	public void setSegundoApellido(String segundoApellido) {
		SegundoApellido = segundoApellido;
	}

	public String getTelefono() {
		return Telefono;
	}

	public void setTelefono(String telefono) {
		Telefono = telefono;
	}

	public String getCorreo() {
		return Correo;
	}

	public void setCorreo(String correo) {
		Correo = correo;
	}

	public Boolean getEstado() {
		return Estado;
	}

	public void setEstado(Boolean estado) {
		Estado = estado;
	}
	
	
	
}
