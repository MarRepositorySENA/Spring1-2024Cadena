package com.medicina.medicina.Entity;

import com.medicina.medicina.Entity.Herencia.DatosBasicos;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table (name="medico" )
public class Medico extends DatosBasicos {

}
