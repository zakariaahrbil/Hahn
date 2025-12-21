package org.example.taski.controllers;

import org.example.taski.dtos.project.request.CreateProjectRequest;
import org.example.taski.dtos.project.response.GetAllProjectsResponse;
import org.example.taski.dtos.project.response.GetProjectResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.taski.mappers.ProjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.example.taski.services.ProjectService;
import org.example.taski.utils.UserIdFromUserDetails;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectsController
{
    private final ProjectService projectService;
    private final ProjectMapper projectMapper;
    private final UserIdFromUserDetails userIdFromUserDetails;

    @PostMapping
    public ResponseEntity<Void> createProject(@Valid @RequestBody CreateProjectRequest createProjectRequest,
            Authentication authentication)
    {
        projectService.createProject(createProjectRequest, userIdFromUserDetails.getUserId(authentication));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable("projectId") Long projectId, Authentication authentication)
    {

        projectService.deleteProject(projectId, userIdFromUserDetails.getUserId(authentication));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<Page<GetAllProjectsResponse>> getAllProjects(Authentication authentication, Pageable pageable)
    {

        Page<GetAllProjectsResponse> allProjectsResponses = projectService.getAllProjects(userIdFromUserDetails.getUserId(authentication), pageable)
                .map(projectMapper::toGetAllProjectsResponse);

        return new ResponseEntity<>(allProjectsResponses, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<GetProjectResponse> getProject(@PathVariable("projectId") Long projectId, Authentication authentication)
    {

        GetProjectResponse getProjectResponse = projectMapper.toGetProjectResponse(
                projectService.getProjectById(projectId, userIdFromUserDetails.getUserId(authentication))
        );

        return new ResponseEntity<>(getProjectResponse, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<GetAllProjectsResponse>> searchProjects(@RequestParam("query") String query, Authentication authentication, Pageable pageable)
    {

        Page<GetAllProjectsResponse> searchResults = projectService.searchProjects(query, userIdFromUserDetails.getUserId(authentication), pageable)
                .map(projectMapper::toGetAllProjectsResponse);

        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }
}
