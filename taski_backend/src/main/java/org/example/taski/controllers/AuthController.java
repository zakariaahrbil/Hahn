package org.example.taski.controllers;

import org.example.taski.dtos.user.request.UserLoginRequest;
import org.example.taski.dtos.user.response.UserLoginResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.taski.mappers.AuthMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.example.taski.services.UserService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController
{
    private final UserService userService;
    private final AuthMapper authMapper;

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@Valid @RequestBody UserLoginRequest userLoginRequest)
    {
        UserLoginResponse userLoginResponse = authMapper.toUserLoginResponse(
                userService.login(userLoginRequest)
        );

        return ResponseEntity.ok(userLoginResponse);
    }
}
