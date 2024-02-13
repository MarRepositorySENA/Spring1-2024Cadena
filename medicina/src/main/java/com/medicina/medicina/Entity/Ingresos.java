package com.medicina.medicina.Entity;

import java.time.LocalDateTime;

import com.medicina.medicina.Entity.Herencia.Estado;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table (name ="ingresos")
public class Ingresos extends Estado {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, length = 36)
	private Long Id;

	@Column (name="habitacion", nullable= false, length = 10)
	private int Habitacion;
	
	@Column (name="cama", nullable= false, length = 10)
	private int Cama;
	
	@Column(name = "fecha_ingreso", nullable = false)
	    private LocalDateTime FechaIngreso;

	@Column(name = "fecha_salida", nullable = false)
	    private LocalDateTime FechaSalida;
	
	@ManyToOne
	@JoinColumn(name = "id_paciente", nullable = false)
	private Pacientes Idpaciente;

	@ManyToOne
	@JoinColumn(name = "id_medico", nullable = false)
    private Medicos Idmedico;

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public int getHabitacion() {
		return Habitacion;
	}

	public void setHabitacion(int habitacion) {
		Habitacion = habitacion;
	}

	public int getCama() {
		return Cama;
	}

	public void setCama(int cama) {
		Cama = cama;
	}

	public LocalDateTime getFechaIngreso() {
		return FechaIngreso;
	}

	public void setFechaIngreso(LocalDateTime fechaIngreso) {
		FechaIngreso = fechaIngreso;
	}

	public LocalDateTime getFechaSalida() {
		return FechaSalida;
	}

	public void setFechaSalida(LocalDateTime fechaSalida) {
		FechaSalida = fechaSalida;
	}

	public Pacientes getIdpaciente() {
		return Idpaciente;
	}

	public void setIdpaciente(Pacientes idpaciente) {
		Idpaciente = idpaciente;
	}

	public Medicos getIdmedico() {
		return Idmedico;
	}

	public void setIdmedico(Medicos idmedico) {
		Idmedico = idmedico;
	}
	
	

}
