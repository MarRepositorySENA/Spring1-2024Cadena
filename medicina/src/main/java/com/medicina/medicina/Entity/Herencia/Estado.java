package com.medicina.medicina.Entity.Herencia;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Estado {
	
	
	@Column(name = "estado", nullable = false)
	private Boolean Estado;
	
	@Column(name = "fecha_creacion", nullable = true)
	private LocalDateTime FechaCreacion;
	
	@Column(name = "fecha_modificacion", nullable = true)
	private LocalDateTime FechaModificacion;
	
	@Column(name = "fecha_eliminacion", nullable = true)
	private LocalDateTime FechaEliminacion;

	public Boolean getEstado() {
		return Estado;
	}

	public void setEstado(Boolean estado) {
		this.Estado = estado;
	}

	public LocalDateTime getFechaCreacion() {
		return FechaCreacion;
	}

	public void setFechaCreacion(LocalDateTime fechaCreacion) {
		this.FechaCreacion = fechaCreacion;
	}

	public LocalDateTime getFechaModificacion() {
		return FechaModificacion;
	}

	public void setFechaModificacion(LocalDateTime fechaModificacion) {
		this.FechaModificacion = fechaModificacion;
	}

	public LocalDateTime getFechaEliminacion() {
		return FechaEliminacion;
	}

	public void setFechaEliminacion(LocalDateTime fechaEliminacion) {
		this.FechaEliminacion = fechaEliminacion;
	}



}
