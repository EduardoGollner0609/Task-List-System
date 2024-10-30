package com.eduardo.tasklistsystem.entities;

import java.util.Date;

public class Task {

	private Long id;
	private String name;
	private Double custo;
	private Date limitDate;
	private Integer orderApresentation;
	
	public Task() {
	}

	public Task(Long id, String name, Double custo, Date limitDate, Integer orderApresentation) {
		this.id = id;
		this.name = name;
		this.custo = custo;
		this.limitDate = limitDate;
		this.orderApresentation = orderApresentation;
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

	public Integer getOrderApresentation() {
		return orderApresentation;
	}

	public void setOrderApresentation(Integer orderApresentation) {
		this.orderApresentation = orderApresentation;
	}
}
