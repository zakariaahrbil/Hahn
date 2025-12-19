package services;

import dtos.progress.repo.ProjectProgress;

public interface ProgressService
{
    ProjectProgress getProgress(Long projectId, Long userId);
}
