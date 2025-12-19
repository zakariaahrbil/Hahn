package services.implementations;

import config.JwtUtil;
import dtos.user.request.UserLoginRequest;
import exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import repositories.UserRepo;
import services.UserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl
        implements UserService
{

    private final UserRepo userRepo;
    private final JwtUtil jwtUtil;

    @Override
    public String login(UserLoginRequest userLoginRequest)
    {
        var user = userRepo.findByEmail(userLoginRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + userLoginRequest.getEmail()));
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
        return jwtUtil.generateToken(userDetails);
    }
}
