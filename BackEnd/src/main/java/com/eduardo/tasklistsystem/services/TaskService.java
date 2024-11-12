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
		if (repository.existsByName(dto.getName())) {
			throw new IllegalArgumentException("Nome já existe");
		}
		Task task = new Task();
		copyDtoToEntity(task, dto);
		task.setOrderApresentation(repository.count() + 1);
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
		order();
	}

	@Transactional
	public TaskDTO update(Long id, TaskDTO dto) {
		if (repository.existsByName(dto.getName())) {
			throw new IllegalArgumentException("Nome já existe");
		}
		Task task = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada."));
		copyDtoToEntity(task, dto);
		return new TaskDTO(repository.save(task));
	}

	@Transactional
	public void upTask(Long id) {
		Task task = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada."));
		if (task.getOrderApresentation() == 1) {
			throw new IllegalArgumentException("Essa tarefa já está na primeira posição.");
		}
		Task taskUp = repository.findByOrderApresentation(task.getOrderApresentation() - 1)
				.orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada."));
		task.setOrderApresentation(task.getOrderApresentation() - 1);
		taskUp.setOrderApresentation(taskUp.getOrderApresentation() + 1);
		repository.saveAll(Arrays.asList(task, taskUp));
	}

	@Transactional
	public void downTask(Long id) {
		Task task = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada"));
		if (task.getOrderApresentation() == repository.count()) {
			throw new IllegalArgumentException("Essa tarefa já está na última posição.");
		}
		Task taskDown = repository.findByOrderApresentation(task.getOrderApresentation() + 1)
				.orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada"));
		task.setOrderApresentation(task.getOrderApresentation() + 1);
		taskDown.setOrderApresentation(taskDown.getOrderApresentation() - 1);
		repository.saveAll(Arrays.asList(task, taskDown));
	}

	private void order() {
		List<Task> tasks = repository.findAll();
		for (int i = 0; i < repository.count(); i++) {
			tasks.get(i).setOrderApresentation(i + 1L);
		}
		repository.saveAll(tasks);
	}

	private void copyDtoToEntity(Task task, TaskDTO dto) {
		task.setName(dto.getName());
		task.setCost(dto.getCost());
		task.setLimitDate(dto.getLimitDate());
		task.setLimitTime(dto.getLimitTime());
	}

}
