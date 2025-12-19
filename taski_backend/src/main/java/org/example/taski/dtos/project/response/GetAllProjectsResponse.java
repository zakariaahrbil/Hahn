package org.example.taski.dtos.project.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GetAllProjectsResponse
{
    private Long id;
    private String title;
}
