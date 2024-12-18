package com.eduardo.tasklistsystem.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.eduardo.tasklistsystem.dto.TaskDTO;
import com.eduardo.tasklistsystem.services.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/tasks")
public class TaskController {

	@Autowired
	private TaskService service;

	@GetMapping
	public ResponseEntity<List<TaskDTO>> findAll() {
		List<TaskDTO> tasks = service.findAll();
		return ResponseEntity.ok().body(tasks);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<TaskDTO> findById(@PathVariable Long id) {
		TaskDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<TaskDTO> insert(@RequestBody @Valid TaskDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<TaskDTO> update(@PathVariable Long id, @RequestBody @Valid TaskDTO dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}

	@PutMapping(value = "/{id}/up")
	public ResponseEntity<Void> upTask(@PathVariable Long id) {
		service.upTask(id);
		return ResponseEntity.ok().build();
	}

	@PutMapping(value = "/{id}/down")
	public ResponseEntity<Void> downTask(@PathVariable Long id) {
		service.downTask(id);
		return ResponseEntity.ok().build();
	}

}
