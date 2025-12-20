package org.example.taski.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.example.taski.dtos.user.request.UserLoginRequest;
import org.example.taski.dtos.user.response.GetMeResponse;
import org.example.taski.dtos.user.response.UserLoginResponse;
import org.example.taski.mappers.AuthMapper;
import org.example.taski.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/me")
    public ResponseEntity<GetMeResponse> me(Authentication authentication)
    {
        GetMeResponse getMeResponse = authMapper.toGetMeResponse(userService.getMe(authentication));
        return new ResponseEntity<>(getMeResponse, HttpStatus.OK);
    }
}
