package dtos.progress.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetProgressResponse
{
    private Double progress;
    private Double totalTasks;
    private Double completedTasks;
}
