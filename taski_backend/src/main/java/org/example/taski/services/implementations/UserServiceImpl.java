package org.example.taski.services.implementations;

import lombok.RequiredArgsConstructor;
import org.example.taski.config.JwtUtil;
import org.example.taski.dtos.user.request.UserLoginRequest;
import org.example.taski.dtos.user.service.UserLogin;
import org.example.taski.entities.User;
import org.example.taski.exceptions.AuthException;
import org.example.taski.exceptions.UserNotFoundException;
import org.example.taski.repositories.UserRepo;
import org.example.taski.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl
        implements UserService
{

    private final UserRepo userRepo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserLogin login(UserLoginRequest userLoginRequest)
    {
        var user = userRepo.findByEmail(userLoginRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + userLoginRequest.getEmail()));

        if (!passwordEncoder.matches(userLoginRequest.getPassword(), user.getPassword())) {
            throw new AuthException("Email or password is incorrect");
        }

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
        String token = jwtUtil.generateToken(userDetails);

        return UserLogin.builder().id(user.getId()).email(user.getEmail()).username(user.getUsername())
                .token(token).build();
    }

    @Override
    public User getMe(Authentication authentication)
    {
        return userRepo.findByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + authentication.getName()));
    }
}
