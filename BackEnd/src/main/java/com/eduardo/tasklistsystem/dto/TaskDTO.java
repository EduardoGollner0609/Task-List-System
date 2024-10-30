package com.eduardo.tasklistsystem.dto;

import java.util.Date;

import com.eduardo.tasklistsystem.entities.Task;

public class TaskDTO {

	private Long id;
	private String name;
	private Double cost;
	private Date limitDate;

	public TaskDTO() {
	}

	public TaskDTO(Task task) {
		id = task.getId();
		name = task.getName();
		cost = task.getCost();
		limitDate = task.getLimitDate();
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

	public Date getLimitDate() {
		return limitDate;
	}

	public void setLimitDate(Date limitDate) {
		this.limitDate = limitDate;
	}
}
