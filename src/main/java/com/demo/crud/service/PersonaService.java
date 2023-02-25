package com.demo.crud.service;

import java.util.List;

import com.demo.crud.entity.Persona;

public interface PersonaService {
	
	Persona findById(Long id);
	
	List<Persona> findAll();
	
	Persona save(Persona persona);
	
	Persona update(Persona persona,Long id);
	
	void deleteById(Long id);

}
