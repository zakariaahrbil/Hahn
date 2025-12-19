package org.example.taski.services;

import org.example.taski.dtos.task.request.CreateTaskRequest;
import org.example.taski.entities.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService
{
    Task createTask(Long projectId, CreateTaskRequest request, Long userId);

    void changeState(Long projectId, Long taskId, Long userId);

    void deleteTask(Long projectId, Long taskId, Long userId);

    Page<Task> getTasksByProjectId(Long projectId, Long userId, Pageable pageable);

}
