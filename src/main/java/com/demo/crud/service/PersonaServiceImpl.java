package com.demo.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.crud.dao.PersonaRepository;
import com.demo.crud.entity.Persona;
import com.demo.crud.exception.ResourceNotFoundException;

@Service
public class PersonaServiceImpl implements PersonaService {

	@Autowired
	PersonaRepository personaRepository;
	
	@Override
	public Persona findById(Long id) {
		
		return personaRepository.findById(id).orElseThrow( () -> new ResourceNotFoundException("No se encontró el registro") );
	}

	@Override
	public List<Persona> findAll() {
		
		return personaRepository.findAll();
	}

	@Override
	public Persona save(Persona persona) {

		return personaRepository.save(persona);
	}
	
	@Override
	public Persona update(Persona persona,Long id) {
		Persona personaAnterior  = null;
		 Optional<Persona> personaOptional = personaRepository.findById(id);
		 if( personaOptional.isPresent()) {
			 personaAnterior = personaOptional.get();
			 personaAnterior.setNombre(persona.getNombre());
			 personaAnterior.setPaterno(persona.getPaterno());
			 personaAnterior.setMaterno(persona.getMaterno());
			 personaAnterior.setTelefono(persona.getTelefono());
			 
			 personaRepository.save(personaAnterior);
		 }else {
			   throw new ResourceNotFoundException("No se encontró el registro");
		 }
		 
		 return personaAnterior;
	}

	@Override
	public void deleteById(Long id) {
		Persona persona  = null;
		Optional<Persona> personaOptional =personaRepository.findById(id);
		if( personaOptional.isPresent()) {
			persona = personaOptional.get();
			personaRepository.delete(persona);
		}else {
			   throw new ResourceNotFoundException("No se encontró el registro");
		 }

	}

}
