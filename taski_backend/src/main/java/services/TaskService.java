package services;

import dtos.task.request.ChangeTaskStateRequest;
import dtos.task.request.CreateTaskRequest;
import entities.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService
{
    Task createTask(CreateTaskRequest request, Long userId);

    void changeState(ChangeTaskStateRequest request, Long userId);

    void deleteTask(Long taskId, Long userId);

    Page<Task> getTasksByProjectId(Long projectId, Long userId, Pageable pageable);

}
