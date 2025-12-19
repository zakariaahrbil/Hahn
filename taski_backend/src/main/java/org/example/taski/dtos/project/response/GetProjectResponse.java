package org.example.taski.dtos.project.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GetProjectResponse
{
    private Long id;
    private String title;
    private String description;
    private LocalDateTime createdAt;
}
