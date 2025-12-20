package org.example.taski.services;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.example.taski.dtos.user.request.UserLoginRequest;
import org.example.taski.dtos.user.service.UserLogin;
import org.example.taski.entities.User;

public interface UserService
{
    UserLogin login(UserLoginRequest userLoginRequest);
    User getMe(Authentication authentication);
}
