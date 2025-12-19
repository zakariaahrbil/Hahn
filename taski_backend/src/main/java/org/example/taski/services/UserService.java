package org.example.taski.services;

import org.example.taski.dtos.user.request.UserLoginRequest;

public interface UserService
{
    String login(UserLoginRequest userLoginRequest);
}
