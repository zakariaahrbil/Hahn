package org.example.taski.services;

import org.example.taski.dtos.project.request.CreateProjectRequest;
import org.example.taski.entities.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectService
{
    Project createProject(CreateProjectRequest request, Long userId);

    void deleteProject(Long projectId, Long userId);

    Page<Project> getAllProjects(Long userId, Pageable pageable);

    Project getProjectById(Long projectId, Long userId);

}
