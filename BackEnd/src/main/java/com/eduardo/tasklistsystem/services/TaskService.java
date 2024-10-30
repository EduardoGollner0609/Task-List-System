package com.eduardo.tasklistsystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduardo.tasklistsystem.dto.TaskDTO;
import com.eduardo.tasklistsystem.entities.Task;
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

	public TaskDTO updayte(Long id, TaskDTO dto) {
		Task task = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada."));
		copyDtoToEntity(task, dto);
		return new TaskDTO(repository.save(task));
	}

	private void copyDtoToEntity(Task task, TaskDTO dto) {
		task.setName(dto.getName());
		task.setCost(dto.getCost());
		task.setLimitDate(dto.getLimitDate());
	}

}
