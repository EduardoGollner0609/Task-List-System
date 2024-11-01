package com.eduardo.tasklistsystem.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.eduardo.tasklistsystem.entities.Task;

public class TaskDTO {

	private Long id;
	private String name;
	private Double cost;
	private LocalDate limitDate;
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
