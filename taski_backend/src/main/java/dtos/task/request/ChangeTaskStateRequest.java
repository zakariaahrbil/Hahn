package dtos.task.request;

import entities.TaskStateEnum;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeTaskStateRequest {
    @NotNull(message = "Task ID is required")
    private Long id;
    @NotNull(message = "New state cannot be null")
    private TaskStateEnum newState;
}
