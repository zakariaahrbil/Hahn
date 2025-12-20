package org.example.taski.services;

import org.example.taski.dtos.user.request.UserLoginRequest;
import org.example.taski.dtos.user.service.UserLogin;
import org.example.taski.entities.User;
import org.springframework.security.core.Authentication;

public interface UserService
{
    UserLogin login(UserLoginRequest userLoginRequest);
    User getMe(Authentication authentication);
}
