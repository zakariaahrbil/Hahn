package org.example.taski.controllers;

import lombok.RequiredArgsConstructor;
import org.example.taski.dtos.progress.response.GetProgressResponse;
import org.example.taski.mappers.ProgressMapper;
import org.example.taski.services.ProgressService;
import org.example.taski.utils.UserIdFromUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects/{projectId}/progress")
@RequiredArgsConstructor
public class ProgressController
{
    private final UserIdFromUserDetails userIdFromUserDetails;
    private final ProgressService progressService;
    private final ProgressMapper progressMapper;

    @GetMapping
    public ResponseEntity<GetProgressResponse> getProjectProgress(@PathVariable("projectId") Long projectId,
            Authentication authentication)
    {
        GetProgressResponse getProgressResponse = progressMapper.toGetProgressResponse(
                progressService.getProgress(projectId,
                userIdFromUserDetails.getUserId(authentication)));

        return new ResponseEntity<>(getProgressResponse, HttpStatus.OK);
    }
}
