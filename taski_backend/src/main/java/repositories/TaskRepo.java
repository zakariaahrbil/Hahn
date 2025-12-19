package repositories;

import dtos.progress.repo.ProjectProgress;
import entities.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo
        extends JpaRepository<Task, Long>
{

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
}
