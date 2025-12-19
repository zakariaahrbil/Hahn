package org.example.taski.mappers;

import org.example.taski.dtos.task.response.GetTasksResponse;
import org.example.taski.entities.Task;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TaskMapper
{
    GetTasksResponse toGetTasksResponse(Task task);
}
