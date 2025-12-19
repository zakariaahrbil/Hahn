package org.example.taski.services.implementations;

import org.example.taski.config.JwtUtil;
import org.example.taski.dtos.user.request.UserLoginRequest;
import org.example.taski.exceptions.AuthException;
import org.example.taski.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.taski.repositories.UserRepo;
import org.example.taski.services.UserService;

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
    public String login(UserLoginRequest userLoginRequest)
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
        return jwtUtil.generateToken(userDetails);
    }
}
