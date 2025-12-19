package services.implementations;

import dtos.progress.repo.ProjectProgress;
import exceptions.ProjectException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import repositories.ProjectRepo;
import repositories.TaskRepo;
import services.ProgressService;

@Service
@RequiredArgsConstructor
public class ProgressServiceImpl
        implements ProgressService
{
    private final ProjectRepo projectRepo;
    private final TaskRepo taskRepo;

    @Override
    public ProjectProgress getProgress(Long projectId, Long userId)
    {
        projectRepo.findByIdAndUserId(projectId, userId)
                .orElseThrow(()-> new ProjectException("Project not found"));

        return taskRepo.getProjectProgressAndTotalTasksAndTotalCompletedTasks(projectId, userId);
    }
}
