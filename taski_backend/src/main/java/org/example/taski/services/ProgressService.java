package org.example.taski.services;

import org.example.taski.dtos.progress.repo.ProjectProgress;

public interface ProgressService
{
    ProjectProgress getProgress(Long projectId, Long userId);
}
