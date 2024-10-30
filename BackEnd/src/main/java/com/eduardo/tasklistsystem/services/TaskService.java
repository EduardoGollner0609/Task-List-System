package com.eduardo.tasklistsystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduardo.tasklistsystem.repositories.TaskRepository;
import com.eduardo.tasklistsystem.services.exceptions.ResourceNotFoundException;

@Service
public class TaskService {

	@Autowired
	private TaskRepository repository;

	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Tarefa não encontrada.");
		}
		repository.deleteById(id);
	}

}
