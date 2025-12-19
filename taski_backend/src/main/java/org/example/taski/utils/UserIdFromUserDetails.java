package org.example.taski.utils;

import org.example.taski.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.example.taski.repositories.UserRepo;

@Component
@RequiredArgsConstructor
public class UserIdFromUserDetails
{
    private final UserRepo userRepo;
    public Long getUserId(Authentication authentication)
    {
        return userRepo.findByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + authentication.getName()))
                .getId();

    }
}
