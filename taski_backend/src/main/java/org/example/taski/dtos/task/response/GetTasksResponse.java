package org.example.taski.dtos.task.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.taski.entities.TaskStateEnum;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GetTasksResponse
{
    private Long id;
    private String title;
    private String description;
    private TaskStateEnum state;
    private LocalDateTime deadline;
}
