package com.eduardo.tasklistsystem.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tb_task")
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private Double custo;
	private Date limitDate;
	@Column(unique = true)
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
