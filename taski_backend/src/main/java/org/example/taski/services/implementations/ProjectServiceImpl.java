package org.example.taski.services.implementations;

import org.example.taski.dtos.project.request.CreateProjectRequest;
import org.example.taski.entities.Project;
import org.example.taski.entities.User;
import org.example.taski.exceptions.ProjectException;
import org.example.taski.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.taski.repositories.ProjectRepo;
import org.example.taski.repositories.UserRepo;
import org.example.taski.services.ProjectService;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl
        implements ProjectService
{
    private final ProjectRepo projectRepo;
    private final UserRepo userRepo;

    @Override
    public Project createProject(CreateProjectRequest request, Long userId)
    {
        User user = userRepo.findById(userId)
                .orElseThrow(()-> new UserNotFoundException("User not found"));
        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setUser(user);

        return projectRepo.save(project);
    }

    @Override
    public void deleteProject(Long projectId, Long userId)
    {
        Project project = projectRepo.findByIdAndUserId(projectId, userId)
                .orElseThrow(()-> new ProjectException("Project not found"));

        projectRepo.delete(project);
    }

    @Override
    public Page<Project> getAllProjects(Long userId, Pageable pageable)
    {
        return projectRepo.findAllByUserId(userId, pageable);
    }

    @Override
    public Project getProjectById(Long projectId, Long userId)
    {
        return projectRepo.findByIdAndUserId(projectId, userId)
                .orElseThrow(()-> new ProjectException("Project not found"));
    }

    @Override
    public Page<Project> searchProjects(String query, Long userId, Pageable pageable)
    {
        return projectRepo.searchByTitleOrDescriptionAndUserId(query, userId, pageable);
    }
}
