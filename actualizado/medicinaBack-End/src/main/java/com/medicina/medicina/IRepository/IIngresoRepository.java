package com.medicina.medicina.IRepository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.medicina.medicina.Entity.Ingreso;

public interface IIngresoRepository extends JpaRepository<Ingreso, Long>{

}
