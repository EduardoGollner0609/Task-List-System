package com.eduardo.tasklistsystem.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.eduardo.tasklistsystem.entities.Task;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TaskDTO {

	private Long id;
	@NotBlank(message = "O nome não pode estar vazio")
	@Size(min = 5, max = 50, message = "O nome deve ter pelo entre 5 a 50 caracteres")
	private String name;
	@Min(value = 1, message = "O custo não pode ser 0 ou negativo.")
	private Double cost;
	@FutureOrPresent(message = "O prazo não pode ser passado.")
	@NotNull(message = "O prazo não pode estar vazio")
	private LocalDate limitDate;
	@NotNull(message = "O horário não pode estar vazio")
	private LocalTime limitTime;

	public TaskDTO() {
	}

	public TaskDTO(Task task) {
		id = task.getId();
		name = task.getName();
		cost = task.getCost();
		limitDate = task.getLimitDate();
		limitTime = task.getLimitTime();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}

	public LocalDate getLimitDate() {
		return limitDate;
	}

	public LocalTime getLimitTime() {
		return limitTime;
	}

	public void setLimitTime(LocalTime limitTime) {
		this.limitTime = limitTime;
	}

	public void setLimitDate(LocalDate limitDate) {
		this.limitDate = limitDate;
	}

}
