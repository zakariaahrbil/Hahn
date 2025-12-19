package services.implementations;

import dtos.task.request.ChangeTaskStateRequest;
import dtos.task.request.CreateTaskRequest;
import entities.Project;
import entities.Task;
import entities.TaskStateEnum;
import exceptions.ProjectException;
import exceptions.TaskException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import repositories.ProjectRepo;
import repositories.TaskRepo;
import services.TaskService;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl
        implements TaskService
{
    private final TaskRepo taskRepo;
    private final ProjectRepo projectRepo;

    @Override
    public Task createTask(CreateTaskRequest request, Long userId)
    {
        Project project = projectRepo.findById(request.getProjectId())
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
    public void changeState(ChangeTaskStateRequest request, Long userId)
    {
        Task task = taskRepo.findById(request.getId())
                .orElseThrow(() -> new TaskException("Task not found"));

        if (!task.getProject().getUser().getId().equals(userId)) {
            throw new TaskException("User does not own the task's project");
        }

        task.setState(request.getNewState());
        taskRepo.save(task);
    }

    @Override
    public void deleteTask(Long taskId, Long userId)
    {
        Task task = taskRepo.findById(taskId)
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
