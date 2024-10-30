package com.eduardo.tasklistsystem.dto;

import java.util.Date;

public class TaskDTO {

	private Long id;
	private String name;
	private Double custo;
	private Date limitDate;

	public TaskDTO() {
	}

	public TaskDTO(Long id, String name, Double custo, Date limitDate) {
		this.id = id;
		this.name = name;
		this.custo = custo;
		this.limitDate = limitDate;
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

	public Double getCusto() {
		return custo;
	}

	public void setCusto(Double custo) {
		this.custo = custo;
	}

	public Date getLimitDate() {
		return limitDate;
	}

	public void setLimitDate(Date limitDate) {
		this.limitDate = limitDate;
	}
}
