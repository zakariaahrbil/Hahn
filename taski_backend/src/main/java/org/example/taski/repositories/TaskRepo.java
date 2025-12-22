package org.example.taski.repositories;

import org.example.taski.dtos.progress.repo.ProjectProgress;
import org.example.taski.entities.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskRepo
        extends JpaRepository<Task, Long>
{

    Optional<Task> findByIdAndProjectId(Long taskId, Long projectId);

    @Query(value = """
            SELECT COUNT(*) as totalTasks,
                       SUM(CASE WHEN t.state = 'COMPLETED' THEN 1 ELSE 0 END) as completedTasks,
                        CASE WHEN COUNT(*) = 0 THEN 0
                             ELSE (SUM(CASE WHEN t.state = 'COMPLETED' THEN 1 ELSE 0 END) * 100) / COUNT(*)
                        END as progressPercentage
            FROM tasks t
            WHERE t.project_id = :project_id AND EXISTS (SELECT 1 FROM projects p WHERE p.id = :project_id AND p.user_id = :user_id)
            """, nativeQuery = true)
    ProjectProgress getProjectProgressAndTotalTasksAndTotalCompletedTasks(@Param("project_id") Long projectId, @Param("user_id") Long userId);

    @Query(value = """
            SELECT * 
            FROM tasks t
            WHERE t.project_id = :projectId 
              AND EXISTS (SELECT 1 FROM projects p WHERE p.id = :projectId AND p.user_id = :userId)
            """, nativeQuery = true)
    Page<Task> findAllByProjectIdAndUserId(@Param("projectId") Long projectId, @Param("userId") Long userId, Pageable pageable);

    @Query(value= "SELECT t FROM Task t WHERE t.project.id = :projectId AND t.project.user.id = :userId AND (LOWER(t.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Task> searchByTitleOrDescriptionAndUserId(@Param("query") String query,@Param("projectId") Long projectId , @Param("userId") Long userId, Pageable pageable);
}
