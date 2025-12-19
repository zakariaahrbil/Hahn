package org.example.taski.mappers;

import org.example.taski.dtos.progress.repo.ProjectProgress;
import org.example.taski.dtos.progress.response.GetProgressResponse;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProgressMapper
{
    GetProgressResponse toGetProgressResponse(ProjectProgress projectProgress);
}
