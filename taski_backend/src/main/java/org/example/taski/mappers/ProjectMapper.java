package org.example.taski.mappers;

import org.example.taski.dtos.project.response.GetAllProjectsResponse;
import org.example.taski.dtos.project.response.GetProjectResponse;
import org.example.taski.entities.Project;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProjectMapper
{
    GetAllProjectsResponse toGetAllProjectsResponse(Project project);
    GetProjectResponse toGetProjectResponse(Project project);
}
