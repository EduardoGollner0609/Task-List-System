package com.eduardo.tasklistsystem.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.eduardo.tasklistsystem.dto.TaskDTO;
import com.eduardo.tasklistsystem.entities.Task;
import com.eduardo.tasklistsystem.repositories.TaskRepository;
import com.eduardo.tasklistsystem.services.exceptions.ResourceNotFoundException;

@Service
public class TaskService {

	@Autowired
	private TaskRepository repository;

	@Transactional
	public TaskDTO insert(TaskDTO dto) {
		Task task = new Task();
		copyDtoToEntity(task, dto);
		task.setOrderApresentation(repository.quantityTasks() + 1);
		return new TaskDTO(repository.save(task));
	}

	@Transactional(readOnly = true)
	public List<TaskDTO> findAll() {
		return repository.findAllByOrderByOrderApresentationAsc().stream().map(x -> new TaskDTO(x)).toList();
	}

	@Transactional(readOnly = true)
	public TaskDTO findById(Long id) {
		return new TaskDTO(
				repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada.")));
	}

	@Transactional(propagation = Propagation.SUPPORTS)
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Tarefa não encontrada.");
		}
		repository.deleteById(id);
	}

	@Transactional
	public TaskDTO update(Long id, TaskDTO dto) {
		Task task = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada."));
		copyDtoToEntity(task, dto);
		return new TaskDTO(repository.save(task));
	}

	@Transactional
	public void riseTask(Long id) {
		Task task = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada."));
		if (task.getOrderApresentation() == 1) {
			throw new IllegalArgumentException("essa tarefa já está na primeira posição.");
		}
		Task taskAbove = repository.findByOrderApresentation(task.getOrderApresentation() - 1)
				.orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada."));
		task.setOrderApresentation(task.getOrderApresentation() - 1);
		taskAbove.setOrderApresentation(taskAbove.getOrderApresentation() + 1);
		repository.saveAll(Arrays.asList(task, taskAbove));
	}

	private void copyDtoToEntity(Task task, TaskDTO dto) {
		task.setName(dto.getName());
		task.setCost(dto.getCost());
		task.setLimitDate(dto.getLimitDate());
		task.setLimitTime(dto.getLimitTime());
	}

}
