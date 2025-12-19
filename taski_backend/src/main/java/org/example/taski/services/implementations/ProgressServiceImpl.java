package org.example.taski.services.implementations;

import org.example.taski.dtos.progress.repo.ProjectProgress;
import org.example.taski.exceptions.ProjectException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.example.taski.repositories.ProjectRepo;
import org.example.taski.repositories.TaskRepo;
import org.example.taski.services.ProgressService;

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
