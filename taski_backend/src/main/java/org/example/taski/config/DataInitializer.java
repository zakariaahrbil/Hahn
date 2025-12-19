package org.example.taski.config;

import lombok.RequiredArgsConstructor;
import org.example.taski.entities.User;
import org.example.taski.repositories.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner
{

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (!userRepo.existsByEmail("admin@taski.com")) {
            User admin = new User();
            admin.setEmail("admin@taski.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setUsername("admin");

            userRepo.save(admin);
        }

    }
}
