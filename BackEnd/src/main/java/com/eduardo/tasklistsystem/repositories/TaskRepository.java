package com.eduardo.tasklistsystem.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.eduardo.tasklistsystem.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

	@Query(value = "SELECT COUNT(*) FROM tb_task", nativeQuery = true)
	Integer quantityTasks();

	List<Task> findAllByOrderByOrderApresentationAsc();
	
	Optional<Task> findByOrderApresentation(Integer OrderApresentation);
}
