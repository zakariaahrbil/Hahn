package org.example.taski.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.taski.dtos.task.request.CreateTaskRequest;
import org.example.taski.dtos.task.response.GetTasksResponse;
import org.example.taski.mappers.TaskMapper;
import org.example.taski.services.TaskService;
import org.example.taski.utils.UserIdFromUserDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
@RequiredArgsConstructor
public class TasksController
{
    private final TaskService taskService;
    private final TaskMapper taskMapper;
    private final UserIdFromUserDetails userIdFromUserDetails;

    @PostMapping
    public ResponseEntity<Void> createTask(@PathVariable("projectId") Long projectId,
            @Valid @RequestBody CreateTaskRequest createTaskRequest, Authentication authentication)
    {
        taskService.createTask(projectId, createTaskRequest, userIdFromUserDetails.getUserId(authentication));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{taskId}/change-status")
    public ResponseEntity<Void> changeTaskStatus(@PathVariable("projectId") Long projectId,
            @PathVariable("taskId") Long taskId, Authentication authentication)
    {
        taskService.changeState(projectId, taskId, userIdFromUserDetails.getUserId(authentication));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable("projectId") Long projectId,
            @PathVariable("taskId") Long taskId, Authentication authentication)
    {
        taskService.deleteTask(projectId, taskId, userIdFromUserDetails.getUserId(authentication));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<Page<GetTasksResponse>> getTasks(@PathVariable ("projectId") Long projectId,
            Authentication authentication, Pageable pageable)
    {
        Page<GetTasksResponse> tasks = taskService.getTasksByProjectId(projectId,
                userIdFromUserDetails.getUserId(authentication), pageable)
                .map(taskMapper::toGetTasksResponse);

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<GetTasksResponse>> searchTasks(@PathVariable("projectId") Long projectId,
            @RequestParam("query") String query, Authentication authentication, Pageable pageable)
    {
        Page<GetTasksResponse> searchResults = taskService.searchTasks(projectId,
                userIdFromUserDetails.getUserId(authentication), query, pageable)
                .map(taskMapper::toGetTasksResponse);

        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }
}
