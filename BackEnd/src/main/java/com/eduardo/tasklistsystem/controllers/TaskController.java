package com.eduardo.tasklistsystem.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eduardo.tasklistsystem.dto.TaskDTO;
import com.eduardo.tasklistsystem.services.TaskService;

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

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<TaskDTO> update(@PathVariable Long id, @RequestBody TaskDTO dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	

}
