package com.eduardo.tasklistsystem.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
}
