package com.eduardo.tasklistsystem.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eduardo.tasklistsystem.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{
	List<Task> findAllByOrderByOrderApresentationAsc();	
}
