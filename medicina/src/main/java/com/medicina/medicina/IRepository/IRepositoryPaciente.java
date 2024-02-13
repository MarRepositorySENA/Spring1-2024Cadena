package com.medicina.medicina.IRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicina.medicina.Entity.Pacientes;

public interface IRepositoryPaciente extends JpaRepository<Pacientes, Long>{

}
