package com.demo.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.crud.entity.Persona;
import com.demo.crud.service.PersonaService;

@RestController
@RequestMapping("/persona")
public class PersonaController {
	
	@Autowired
	PersonaService personaService;
	
	@GetMapping("/findAll")
	public ResponseEntity<?> findAll() {
		
		List<Persona> personas = personaService.findAll();
		return new ResponseEntity<List<Persona>>(personas, HttpStatus.OK);
		
	}
	
	@GetMapping("/findById/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		
		Persona persona = personaService.findById(id);
		return new ResponseEntity<Persona>(persona, HttpStatus.OK);
		
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Persona persona) {
		
		Persona personaNuevo = personaService.save(persona);
		return new ResponseEntity<Persona>(personaNuevo, HttpStatus.OK);
		
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody Persona persona) {
		
		Persona personaNuevo = personaService.update(persona);
		return new ResponseEntity<Persona>(personaNuevo, HttpStatus.OK);
		
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		String mensaje = "elemento eliminado";
		
		personaService.deleteById(id);
		return new ResponseEntity<String>(mensaje, HttpStatus.OK);
		
	}

}
