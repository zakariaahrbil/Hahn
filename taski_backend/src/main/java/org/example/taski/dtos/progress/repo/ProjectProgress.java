package org.example.taski.dtos.progress.repo;

public interface ProjectProgress
{
    Long getTotalTasks();
    Long getCompletedTasks();
    Double getProgressPercentage();
}
