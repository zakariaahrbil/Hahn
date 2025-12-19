package services.implementations;

import dtos.project.request.CreateProjectRequest;
import entities.Project;
import entities.User;
import exceptions.ProjectException;
import exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import repositories.ProjectRepo;
import repositories.UserRepo;
import services.ProjectService;

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


}
