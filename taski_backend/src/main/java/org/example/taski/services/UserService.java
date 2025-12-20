package org.example.taski.services;

import org.example.taski.dtos.user.request.UserLoginRequest;
import org.example.taski.dtos.user.service.UserLogin;

public interface UserService
{
    UserLogin login(UserLoginRequest userLoginRequest);
}
