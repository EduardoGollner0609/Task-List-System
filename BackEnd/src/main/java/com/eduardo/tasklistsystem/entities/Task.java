package com.eduardo.tasklistsystem.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_task")
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private Double cost;
	private LocalDate limitDate;
	private LocalTime limitTime;
	@Column(unique = true)
	private Integer orderApresentation;

	public Task() {
	}

	public Task(Long id, String name, Double cost, LocalDate limitDate, LocalTime limitTime,
			Integer orderApresentation) {
		this.id = id;
		this.name = name;
		this.cost = cost;
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

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}

	public LocalDate getLimitDate() {
		return limitDate;
	}

	public void setLimitDate(LocalDate limitDate) {
		this.limitDate = limitDate;
	}

	public Integer getOrderApresentation() {
		return orderApresentation;
	}

	public void setOrderApresentation(Integer orderApresentation) {
		this.orderApresentation = orderApresentation;
	}

	public LocalTime getLimitTime() {
		return limitTime;
	}

	public void setLimitTime(LocalTime limitTime) {
		this.limitTime = limitTime;
	}

}
