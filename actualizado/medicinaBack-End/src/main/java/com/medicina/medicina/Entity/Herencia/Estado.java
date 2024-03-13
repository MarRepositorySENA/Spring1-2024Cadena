package com.medicina.medicina.Entity.Herencia;



import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Estado {
	
	
	@Column(name = "estado", nullable = false)
	private Boolean Estado;
	
	@Column(name = "fecha_creacion", nullable = true)
	private Date FechaCreacion;
	
	@Column(name = "fecha_modificacion", nullable = true)
	private Date FechaModificacion;
	
	@Column(name = "fecha_eliminacion", nullable = true)
	private Date FechaEliminacion;

	public Boolean getEstado() {
		return Estado;
	}

	public void setEstado(Boolean estado) {
		Estado = estado;
	}

	public Date getFechaCreacion() {
		return FechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		FechaCreacion = fechaCreacion;
	}

	public Date getFechaModificacion() {
		return FechaModificacion;
	}

	public void setFechaModificacion(Date fechaModificacion) {
		FechaModificacion = fechaModificacion;
	}

	public Date getFechaEliminacion() {
		return FechaEliminacion;
	}

	public void setFechaEliminacion(Date fechaEliminacion) {
		FechaEliminacion = fechaEliminacion;
	}


	

}
