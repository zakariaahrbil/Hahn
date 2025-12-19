package services;

import dtos.user.request.UserLoginRequest;

public interface UserService
{
    String login(UserLoginRequest userLoginRequest);
}
