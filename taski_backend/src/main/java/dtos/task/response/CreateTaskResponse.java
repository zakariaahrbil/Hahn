package dtos.task.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateTaskResponse
{
    private Long id;
    private String title;
    private String description;
    private LocalDateTime deadline;
}
