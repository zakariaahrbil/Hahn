package org.example.taski.services.implementations;

import lombok.RequiredArgsConstructor;
import org.example.taski.dtos.task.request.CreateTaskRequest;
import org.example.taski.entities.Project;
import org.example.taski.entities.Task;
import org.example.taski.entities.TaskStateEnum;
import org.example.taski.exceptions.ProjectException;
import org.example.taski.exceptions.TaskException;
import org.example.taski.repositories.ProjectRepo;
import org.example.taski.repositories.TaskRepo;
import org.example.taski.services.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl
        implements TaskService
{
    private final TaskRepo taskRepo;
    private final ProjectRepo projectRepo;

    @Override
    public Task createTask(Long projectId, CreateTaskRequest request, Long userId)
    {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new ProjectException("Project not found"));

        if (!project.getUser().getId().equals(userId)) {
            throw new TaskException("User does not own the project");
        }

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDeadline(request.getDeadline());
        task.setState(TaskStateEnum.NOT_COMPLETED);
        task.setProject(project);

        return taskRepo.save(task);
    }

    @Override
    public void changeState(Long projectId, Long taskId, Long userId)
    {
        Task task = taskRepo.findByIdAndProjectId(taskId, projectId)
                .orElseThrow(() -> new TaskException("Task not found"));

        if (!task.getProject().getUser().getId().equals(userId)) {
            throw new TaskException("User does not own the task's project");
        }

        task.setState(
                task.getState() == TaskStateEnum.COMPLETED
                        ? TaskStateEnum.NOT_COMPLETED
                        : TaskStateEnum.COMPLETED
        );
        taskRepo.save(task);
    }

    @Override
    public void deleteTask(Long projectId, Long taskId, Long userId)
    {
        Task task = taskRepo.findByIdAndProjectId(taskId, projectId)
                .orElseThrow(() -> new TaskException("Task not found"));

        if (!task.getProject().getUser().getId().equals(userId)) {
            throw new TaskException("User does not own the task's project");
        }

        taskRepo.delete(task);
    }

    @Override
    public Page<Task> getTasksByProjectId(Long projectId, Long userId, Pageable pageable)
    {
        return taskRepo.findAllByProjectIdAndUserId(projectId, userId, pageable);
    }
}
