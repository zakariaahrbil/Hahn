package org.example.taski.mappers;

import org.example.taski.dtos.user.response.GetMeResponse;
import org.example.taski.dtos.user.response.UserLoginResponse;
import org.example.taski.dtos.user.service.UserLogin;
import org.example.taski.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthMapper
{
    @Mapping(target = "token", source = "userLogin.token")
    @Mapping(target = "id", source = "userLogin.id")
    @Mapping(target = "username", source = "userLogin.username")
    @Mapping(target = "email", source = "userLogin.email")
    UserLoginResponse toUserLoginResponse(UserLogin userLogin);

    @Mapping(target = "id", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "email", source = "user.email")
    GetMeResponse toGetMeResponse(User user);
}
