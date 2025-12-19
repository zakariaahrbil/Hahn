package utils;

import exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import repositories.UserRepo;

@Component
@RequiredArgsConstructor
public class UserIdFromUserDetails
{
    private final UserRepo userRepo;
    public Long getUserId(User user)
    {
        return userRepo.findByEmail(user.getUsername())
                .orElseThrow(()-> new UserNotFoundException("User not found"))
                .getId();
    }
}
